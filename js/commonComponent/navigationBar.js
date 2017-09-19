import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StatusBar, Platform, StyleSheet} from 'react-native';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden: PropTypes.bool
}

export default class NavigationBar extends Component {
    static propTypes = {
        style: View.propTypes.style,
        title: PropTypes.string,
        titleStyle:PropTypes.oneOf(['light','dark']),
        titleView: PropTypes.element,
        navigationBarHide: PropTypes.bool,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarShape),
    }

    static defaultProps = {
        statusBar: {
            barStyle: 'dark-content',
            hidden: false
        }
    }

    render() {
        let status = <View style={styles.statusBar}><StatusBar {...this.props.statusBar}/></View>
        return (
            <View style={this.props.style}>
                {status}
                {this.content()}
            </View>
        )
    }

    titleStyle(){
        if(this.props.titleStyle == 'light'){
            return [styles.titleDark,styles.titleLight];
        }else{
            return styles.titleDark;
        }
    }

    content(){
        if(this.props.navigationBarHide != true){
            let titleView = this.props.titleView ? this.props.titleView :
                <Text style={this.titleStyle()}>{this.props.title}</Text>
            return (
                <View style={styles.navBar}>
                    {this.props.leftButton}
                    <View style={styles.titleView}>{titleView}</View>
                    <View style={styles.rightBox}>{this.props.rightButton}</View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    },
    navBar: {
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        flexDirection: 'row',

    },
    rightBox:{
      position:'absolute',
      right:10,
    },
    leftBox:{
      position:'absolute',
      left:10,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    titleDark: {
        fontSize: 17,
        color: '#555',
        fontFamily: Platform.OS === 'ios' ? 'PingFang SC' : 'normal'
    },
    titleLight:{
        color:'#fff'
    }
});