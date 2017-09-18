import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class LoadMoreBar extends Component {

    static propTypes = {
        title: PropTypes.string,
        isLoadingMore:PropTypes.bool
    }

    static defaultProps = {
        title:'加载中...',
        isLoadingMore:false
    }

    render() {
        if(this.props.isLoadingMore == true){
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            )
        }else{
            return false;
        }
    }

}

const styles = StyleSheet.create({
    container:{
        height:50,
        justifyContent:'center'
    },
    text:{
        textAlign:'center',
        color:'#999'

    }
});