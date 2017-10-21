import React, {Component} from 'react'
import {View, StyleSheet, Button} from 'react-native';
import MapView from 'react-native-maps';

export default class MapPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = {
        headerStyle:{backgroundColor:"#fff"},
        title:'学校地图',
        headerTintColor:"#484848"
    }

    componentDidMount () {

    }

    render(){
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         initialRegion={{
                             latitude: 43.773613,
                             longitude: -79.505424,
                             latitudeDelta: 0.1,
                             longitudeDelta: 0.1,
                         }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: 43.773613,
                            longitude: -79.505424,
                        }}
                    />
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    map: {
        flex:1,
    }
})
