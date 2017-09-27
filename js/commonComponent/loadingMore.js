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
        isLoadingMore: PropTypes.bool
    }

    static defaultProps = {
        isLoadingMore: false,
    }

    render() {
        if (this.props.isLoadingMore === true) {
            return (
                <View style={{position:'absolute',
                    left:Dimensions.get('window').width/2-40,
                    top:Dimensions.get('window').height/2-40,
                    width:80,
                    height:80,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:10,
                    backgroundColor:'rgba(0,0,0,0.8)'
                }}>
                    <ActivityIndicator/>
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