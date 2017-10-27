import React, {Component} from 'react';
import {View, StyleSheet, Button, Text, TouchableOpacity, Image} from 'react-native';
import LoginPage from '../user/login.page';


export default class HomePage extends Component {


    static navigationOptions = ({navigation}) => {
        return {
            title:"首页",
            //headerRight: <Button style={{marginRight:10}} title={"登录"} color="#000" onPress={() => navigation.state.login()}/>
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
                    <View style={styles.appBtn}>
                        <TouchableOpacity style={[styles.appButton,{backgroundColor:"#ea3c46"}]} onPress={this.navigateToMapPage}>
                            <Image style={styles.appButtonImage} source={require("../../../res/icon/map.png")}/>
                        </TouchableOpacity>
                        <Text>地图</Text>
                    </View>
                    <View style={styles.appBtn}>
                        <TouchableOpacity style={[styles.appButton,{backgroundColor:"#239685"}]} onPress={this.navigateToEventPage}>
                            <Image style={styles.appButtonImage} source={require("../../../res/icon/event.png")}/>
                        </TouchableOpacity>
                        <Text>活动</Text>
                    </View>
                    <View style={styles.appBtn}>
                        <TouchableOpacity style={[styles.appButton,{backgroundColor:"#eb8e4b"}]} onPress={this.navigateToBookPage}>
                            <Image style={styles.appButtonImage} source={require("../../../res/icon/usedbook.png")}/>
                        </TouchableOpacity>
                        <Text>二手书</Text>
                    </View>
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
    },
    appButton:{
        padding:18,
        borderRadius:40,
        overflow:'hidden',
        marginBottom:10
    },
    appButtonImage:{
        width:24,
        height:24,
        tintColor:"#fff",
    }
})
