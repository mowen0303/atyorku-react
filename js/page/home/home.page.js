import React, {Component} from 'react';

import {View, StyleSheet, Button, Text} from 'react-native';
import LoginPage from '../user/login.page';


export default class HomePage extends Component {


    static navigationOptions = ({navigation}) => {
        return {
            headerRight: <Button title={"登录"} color="#000" onPress={() => navigation.state.login()}/>
        }
    }

    componentDidMount() {
        //this.props.navigation.setParams({login: this.login})
        this.props.navigation.state.login =this.login;
    }

    login = () => {
        this.props.navigation.navigate('LoginPage', {parentPage: "123"})
        // console.log(this.props.navigation);
        //alert(1)
        //console.log(this.props);
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={styles.appContainer}>
                    <View style={styles.appBtn}><Text onPress={this.navigateToMapPage}>地图</Text></View>
                    <View style={styles.appBtn}><Text onPress={this.navigateToEventPage}>活动</Text></View>
                    <View style={styles.appBtn}><Text onPress={this.navigateToBookPage}>二手书</Text></View>
                </View>
            </View>
        );
    }


    navigateToMapPage = () => {
        this.props.navigation.navigate('MapPage');
    }

    navigateToEventPage = () => {
        this.props.navigation.navigate('EventPage');
    }

    navigateToBookPage = () => {
        this.props.navigation.navigate('BookPage');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    appContainer:{
        flexDirection:'row',
    },
    appBtn: {
        flex: 1,
        height:100,
        alignItems:'center',
        marginTop:100
    }
})
