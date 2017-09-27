import React, {Component, PropTypes} from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Image} from 'react-native';

export default class UserButtonListView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {}

    render() {
        return (
            <View>
                <Text>123</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 38,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
