import React, {Component} from 'react';
import {
    View, StyleSheet, Dimensions, StatusBar, Platform, Alert, TouchableOpacity, Text, Keyboard,
    TextInput, ToastAndroid, ScrollView
} from 'react-native';
import MapView from "react-native-maps";

import MapService from './service/map.service';
import FloatingButton from "./component/floating-button.component";
import SearchResultList from "./component/search-result-list.component";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.012;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPage extends Component {

    constructor(props) {
        super(props);
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
                results: [
                    {
                        id: 1,
                        full_name: "Lassonde Building",
                        init: "LAS",
                        latitude: 43.773966,
                        longitude: -79.505355,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    {
                        id: 2,
                        full_name: "Bergeron Centre",
                        init: "BGR",
                        latitude: 43.772250,
                        longitude: -79.506505,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    {
                        id: 3,
                        full_name: "Osgoode Hall Law School",
                        init: "OSG",
                        latitude: 43.770724,
                        longitude: -79.504490,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                ],
            },

            onEndReachedThreshold: 10,
            locationLoaded: false,
            locationData: null,
            chosen: null,
            showResult: false,
            searchBarOnFocus: false,
            keyword: "",
        }
    }

    static navigationOptions = {
        // header: null,
        headerStyle: {backgroundColor: "#fff"},
        title: '学校地图',
        headerTintColor: "#484848"
    };

    watchID = null;

    async getLocations() {
        await this.setState({isLoadingLocationList: true});
        MapService.getLocationList()
            .then(async json => {
                await this.setState({isLoadingLocationList: false});
                if (json.code === 1) {
                    await this.setState({locationData: json.result});
                    if (Platform.OS == 'android') {
                        ToastAndroid.show("Location data loaded", ToastAndroid.SHORT)
                    } else {
                        Alert.alert('Alert', 'Location data loaded');
                    }
                    this.setState({locationLoaded: true});
                } else {
                    Alert.alert(json.code, json.message);
                }
            })
            .catch(error => {
                this.setState({locationLoaded: false});
                Alert.alert('错误', error.toString());
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

    componentWillMount() {

    }

    componentDidMount() {
        StatusBar.setBarStyle('dark-content', false);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('rgba(0,0,0,0)');
        }

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

    onReceiveDataFromList = (data) => {
        let chosen = [];
        chosen.push(data);
        this.setState({chosen});
        ToastAndroid.show(data.item.full_name, ToastAndroid.SHORT);
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         region={this.state.currentPosition}
                         showsUserLocation
                         showsMyLocationButton={false}
                >
                    {
                        this.state.chosen != null ? this.state.chosen.map(
                            marker => <MapView.Marker
                                coordinate={{
                                    latitude: Number(marker.item.latitude),
                                    longitude: Number(marker.item.longitude)
                                }}
                                title={marker.item.name}
                                key={marker.item.id}
                            />) : null
                    }
                </MapView>

                <View style={styles.searchArea}>
                    <TextInput placeholder="去哪里？"
                               style={styles.searchBar}
                               underlineColorAndroid="rgba(0,0,0,0)"
                               onChangeText={(text) => this.setState({keyword: text})}
                               onFocus={() => this.setState({showResult: true})}
                               //onBlur={() => this.setState({showResult: false})}
                    />
                    {
                        this.state.showResult ?
                            <View style={styles.list}>
                                <SearchResultList parentPage={this} data={this.state.locationData
                                    .filter(item => JSON.stringify(item.init).toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ||
                                        JSON.stringify(item.full_name).toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1)}/>
                            </View>
                            : null
                    }
                </View>
                {
                    this.state.showResult ? null :
                        <FloatingButton style={styles.floatingButton}
                                        color='#4285f4'
                                        // red:#db4437, blue:#4285f4
                                        iconSrc={require('../../../res/icon/gps.png')}
                        />
                }
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
    },
    list: {
        top: 0,
        flex: 1,
    },
    searchArea: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
        // justifyContent: 'center',
    },
    searchBar: {
        elevation: 1,
        textAlign: 'center',
        backgroundColor: '#fff',
        height: 45,
        margin: 15,
        marginBottom: 0,
        width: '93%',
        top: 0,
        borderRadius: 0,
    },
});