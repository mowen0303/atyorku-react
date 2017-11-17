import React from "react";
import {View, StyleSheet} from 'react-native';
import MapView from "react-native-maps";

export const MapContainer = ({region})=>{

    return(
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={region}
            >
            </MapView>
        </View>
    )
};

const styles = {
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
};

export default MapContainer;