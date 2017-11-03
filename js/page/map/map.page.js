import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
import MapView from "react-native-maps";

import SearchBar from "./component/searchBar.component";
import FloatingButton from "./component/floatingButton.component";

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
            markerPosition: {
                latitude: 43.773613,
                longitude: -79.505424,
            },
        }
    }

    static navigationOptions = {
        header: null,
        // headerStyle: {backgroundColor: "#fff"},
        // title: '学校地图',
        // headerTintColor: "#484848"
    };

    watchID: ?number = null;

    componentDidMount() {
        StatusBar.setBarStyle('light-content', false);
        if(Platform.OS === 'android'){
            StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');
        }
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
                timeout: 20000,
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

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         region={this.state.currentPosition}
                >
                    <MapView.Marker coordinate={this.state.markerPosition}
                                    color='blue'
                    />
                </MapView>
                <SearchBar/>
                <FloatingButton style={styles.floatingButton}
                                color='#db4437'
                                // red:#db4437, blue:#4285f4
                                iconSrc={require('../../../res/icon/gps.png')}
                />
            </View>
        );
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