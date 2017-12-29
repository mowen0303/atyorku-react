import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ToastAndroid} from 'react-native';

export default class MapBottomSheet extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    static propsTypes = {

    }

    render() {

        return(
            <View style={styles.container}>
                <Text style={styles.buildingName}>{this.props.data? "null" : this.props.data.item.full_name}</Text>
                <Text style={styles.buildingInit}>{this.props.data? "null" : this.props.data.item.init}</Text>
                <TouchableOpacity style={styles.iconContainer}
                                    onPress={()=>{/* TODO */}}
                >
                    <Image style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        padding: 10,
        margin: 15,
        width: '93%',
        borderRadius: 4,
    },
    iconContainer: {
        height: 25,
        width: 25,
    },
    icon: {
        height: 25,
        width: 25,
    },
    buildingName: {

    },
    buildingInit: {

    }
});