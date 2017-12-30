import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from "react-native";

export default class FloatingButton extends Component {

    constructor() {
        super();
        this.state = { active: false };
        this.onPressIn = () => this.setState({ active: true });
        this.onPressOut = () => this.setState({ active: false });
    }

    _returnCustomColorStyle(color) {
        return({
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: color || '#fff',
            justifyContent:'center',
            alignItems:"center",
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.buttonMask} activeOpacity={0.5}>
                <View style={this._returnCustomColorStyle(this.props.color)}>
                    <Image style={styles.icon} source={this.props.iconSrc}/>
                </View>
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    buttonMask: {
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 20,
        elevation: 3,
    },
    icon: {
        height: 30,
        width: 30,
    }
});