import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';

export default class LoadMore extends Component {

    static propTypes = {
        isLoadingMore: PropTypes.bool
    }

    static defaultProps = {
        isLoadingMore: false,
    }
    render() {
        if (this.props.isLoadingMore === true) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            return false
        }
    }
}

export class LoadMiddle extends Component {

    static propTypes = {
        isLoadingMore: PropTypes.bool,
        text:PropTypes.string,
    }

    static defaultProps = {
        isLoadingMore: false,
        text:"加载中...",
    }

    render() {
        if (this.props.isLoadingMore === true) {
            return (
                <View style={{position:'absolute',
                    left:Dimensions.get('window').width/2-70,
                    top:Dimensions.get('window').height/2-140,
                    width:140,
                    height:90,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:10,
                    backgroundColor:'rgba(0,0,0,0.8)'
                }}>
                    <ActivityIndicator style={{marginTop:20}}/>
                    <Text style={{color:"#aaa",marginTop:10,fontSize:13}}>{this.props.text}</Text>
                </View>
            )
        } else {
            return false
        }
    }
}



const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        alignItems: 'center',
        color: '#ccc',
        marginTop: 20
    }
});