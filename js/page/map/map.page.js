import React, {Component} from 'react';
import {
    View, StyleSheet, Dimensions, StatusBar, Platform, Alert, TouchableOpacity, Keyboard,
    TextInput, ToastAndroid, Image, TouchableWithoutFeedback, Modal, Linking
} from 'react-native';
import MapView from "react-native-maps";

import MapService from './service/map.service';
import FloatingButton from "./component/floating-button.component";
import SearchResultList from "./component/search-result-list.component";
import MapDetailPin from "./component/map-detail-pin.component";

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
            showLocationCard: false,
            keyword: "",
        }
        // this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }

    static navigationOptions = {
        header: null,
        // headerStyle: {backgroundColor: "#fff"},
        // title: '学校地图',
        // headerTintColor: "#484848"
    };

    watchID = null;

    async getLocations() {
        await this.setState({isLoadingLocationList: true});
        MapService.getLocationList()
            .then(async json => {
                await this.setState({isLoadingLocationList: false});
                if (json.code === 1) {
                    await this.setState({locationData: json.result});
                    // debug
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
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentDidMount() {
        // this.keyboardDidShowListener.bind(this);
        // this.keyboardDidHideListener.bind(this);

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
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        // do nothing
    }

    _keyboardDidHide() {
        // Alert.alert("提示", "Keyboard dismissed");
        this.setState({showResult: false});  // the solution is to "bind(this)", but how and where???
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
        /* goBack helper
         * https://github.com/react-community/react-navigation/issues/2295
         */
        const {goBack} = this.props.navigation;

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
                                onPress={() => {
                                    // this.setState({showLocationCard: true});
                                    if (Platform.OS == 'android') {
                                        // Alert.alert("","https://www.google.com/maps/dir/?api=1&"+marker.item.latitude+","+marker.item.longitude);
                                        // Linking.openURL("geo:"+marker.item.latitude+","+marker.item.longitude);
                                        Linking.openURL("https://www.google.com/maps/search/?api=1&"+marker.item.latitude+","+marker.item.longitude);
                                    } else {
                                        Linking.openURL("http://maps.apple.com/?daddr="+marker.item.latitude+","+marker.item.longitude);
                                    }
                                }}
                            />) : null
                    }
                    {
                        this.state.chosen != null ? this.state.chosen.map(
                            polygon => <MapView.Polygon
                                            key={polygon.item.id}
                                            coordinates={[{latitude: 43.773944, longitude: -79.506611}, {latitude: 43.773777, longitude: -79.506524}, {latitude: 43.773797, longitude: -79.506437}, {latitude: 43.773621, longitude: -79.506359}, {latitude: 43.773586, longitude: -79.506458}, {latitude: 43.773419, longitude: -79.506380}, {latitude: 43.773578, longitude: -79.505653}, {latitude: 43.773753, longitude: -79.505738}, {latitude: 43.773773, longitude: -79.505653}, {latitude: 43.773953, longitude: -79.505728}, {latitude: 43.773934, longitude: -79.505812}, {latitude: 43.774112, longitude: -79.505885}, {latitude: 43.773944, longitude: -79.506611}]}
                                            strokeColor={"rgba(255,255,255,0.8)"}
                                            strokeWidth={2}
                                            fillColor={"rgba(255,0,0,0.5)"}
                                        />
                        ) : null
                    }
                </MapView>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.searchArea}>
                    <View>
                        <View style={styles.navigateSearchArea}>
                            {
                                this.state.showResult?
                                    <TouchableOpacity ref={"naviButton"} style={styles.naviButton} onPress={() => {
                                        this.setState({showResult: false});
                                        Keyboard.dismiss();
                                    }}>
                                        <Image ref={"naviIcon"} style={styles.naviIcon} source={require('../../../res/icon/back3.png')} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity ref={"naviButton"} style={styles.naviButton} onPress={() => goBack()}>
                                        <Image ref={"naviIcon"} style={styles.naviIcon} source={require('../../../res/icon/apps.png')} />
                                    </TouchableOpacity>
                            }

                            <TextInput placeholder="去哪儿？"
                                       style={styles.input}
                                       underlineColorAndroid="rgba(0,0,0,0)"
                                       onChangeText={(text) => this.setState({keyword: text})}
                                       onFocus={() => this.setState({showResult: true})}
                                       onBlur={() => this.setState({showResult: false})}
                                       ref={"searchBar"}
                            />
                        </View>

                        {
                            (this.state.showResult && this.state.keyword) ?
                                <View style={styles.list}>
                                    <SearchResultList parentPage={this} data={this.state.locationData
                                        .filter(item => JSON.stringify(item.init).toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ||
                                            JSON.stringify(item.full_name).toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1)}/>
                                </View>
                                : null
                        }
                    </View>
                </TouchableWithoutFeedback>
                {
                    this.state.showResult ? null :
                        <FloatingButton style={styles.floatingButton}
                                        color='#4285f4'
                                        // red:#db4437, blue:#4285f4
                                        iconSrc={require('../../../res/icon/gps.png')}
                        />
                }
                <Modal transparent
                       visible={this.state.showLocationCard}
                       animationType={"fade"}
                       onRequestClose={()=>{}}

                >
                    <TouchableOpacity onPress={()=>{this.setState({showLocationCard: false})}}
                                      style={styles.cardBackground}
                    >
                    </TouchableOpacity>
                    <MapDetailPin data={this.state.chosen}/>
                </Modal>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
    },
    navigateSearchArea: {
        // flex: 1,
        elevation: 1,
        backgroundColor: '#fff',
        height: 45,
        margin: 15,
        marginBottom: 0,
        width: '93%',
        top: 0,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "flex-start",
    },
    input: {
        marginLeft: 20,
        textAlign: 'left',
        flex: 1,
    },
    naviButton: {
        width: 25,
        height: 25,
        margin: 10,
    },
    naviIcon: {
        width: 25,
        height: 25,
    },
    cardBackground: {
        flex: 1,
    }
});