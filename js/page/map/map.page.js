import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Platform, Alert} from 'react-native';
import MapView from "react-native-maps";

import MapService from './service/map.service';
import SearchBar from "./component/search-bar.component";
import FloatingButton from "./component/floating-button.component";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.012;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPage extends Component {

    constructor(props) {
        super(props);  // why???
        this.state = {
            currentPosition: {
                latitude: 43.773613,
                longitude: -79.505424,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            lastPosition: {
                latitude: 43.773613,
                longitude: -79.505424,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },

            locations: {
                marker: [
                    {
                        name: "Lassonde Building",
                        latitude: 43.773966,
                        longitude: -79.505355,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    {
                        name: "Bergeron Centre",
                        latitude: 43.772250,
                        longitude: -79.506505,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    {
                        name: "Osgoode Hall Law School",
                        latitude: 43.770724,
                        longitude: -79.504490,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                ]
            },

            isLoadingLocationList: false,
            locationData: null,

        }
    }

    static navigationOptions = {
        header: null,
        // headerStyle: {backgroundColor: "#fff"},
        // title: '学校地图',
        // headerTintColor: "#484848"
    };

    watchID = null;

    async getLocations(){
        await this.setState({isLoadingLocationList:true});
        MapService.getLocationList()
            .then(async json=>{
                await this.setState({isLoadingLocationList:false});
                if(json.code===1){
                    await this.setState({locationData:json.result});
                }else{
                    Alert.alert('提示',json.message);
                }

            })
            .catch(error=>{
                this.setState({isLoadingLocationList:false});
                Alert.alert('错误',error.toString());
            })
    }

    moveViewToCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = parseFloat(position.coords.latitude);
                let lng = parseFloat(position.coords.longitude);

                let initPosition = {
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };

                this.setState({currentPosition: initPosition});
                this.setState({markerPosition: initPosition});
            },
            (error) => alert(JSON.stringify(error)),
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 1000,
            }
        );

        this.watchID = navigator.geolocation.watchPosition(
            (position) => {
                let lat = parseFloat(position.coords.latitude);
                let lng = parseFloat(position.coords.longitude);

                let lastPosition = {
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };

                this.setState({currentPosition: lastPosition});
                this.setState({markerPosition: lastPosition});
            }
        )
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content', false);
        if(Platform.OS === 'android'){
            StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');
        }

        // Get data from server and store them locally
        // TODO - check database version before storing the list locally
        this.setState({locationData: this.getLocations()});
        MapService.saveLocationsToLocalStorage(this.state.locationData);
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        this.props.navigation.state.showDetail = this.showDetail;
    }

    navigateToDetailPage = () => {
        // this.props.navigation.navigate('DetailMapPage');
        Alert.alert("Alert", "Floating button clicked.")
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         region={this.state.currentPosition}
                         showsUserLocation
                >
                    {this.state.locations.marker.map(
                        marker => <MapView.Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            title={marker.name}
                        />
                    )}
                </MapView>
                <SearchBar/>
                <FloatingButton style={styles.floatingButton}
                                color='#4285f4'
                                // red:#db4437, blue:#4285f4
                                iconSrc={require('../../../res/icon/gps.png')}
                                onPress={this.navigateToDetailPage}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "flex-end",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    floatingButton: {
        right: 0,
    }
});