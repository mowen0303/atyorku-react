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
                         region={{
                             latitude: 37.78825,
                             longitude: -122.4324,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        top:0,
        left:0,
        bottom:0,
        right:0,
        position:'absolute',
        justifyContent:'flex-end',
    },
    map: {
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        alignItems:'center'
    }
})
