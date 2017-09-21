import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default class LoadMoreBar extends Component {

    static propTypes = {
        isLoadingMore:PropTypes.bool
    }

    static defaultProps = {
        isLoadingMore:false,
    }

    render() {
        if(this.props.isLoadingMore === true){
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        }else{
            return false
        }
    }

}

const styles = StyleSheet.create({
    container:{
        height:100,
        justifyContent:'center',
        flexDirection:'row',
    },
    text:{
        alignItems:'center',
        color:'#ccc',
        marginTop:20
    }
});