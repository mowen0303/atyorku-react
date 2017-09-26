import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Image,AsyncStorage} from 'react-native';
import UserInterface from './interface/user.Interface';
import UserInfoView from './component/userInfoView';

export default class HomePage extends Component {

    userData = new UserInterface();

    constructor(props) {
        super(props);
        this.state = {
            userData:new UserInterface(),
        }
    }

    static navigationOptions = {
        //headerStyle:{backgroundColor:'#fff',shadowColor:'transparent'}
        header: null,
    }

    componentDidMount() {
        //this.props.navigation.setParams({login: this.login})

    }

    componentDidMount() {
        //alert(this.user.id)
    }


    render() {

        return (
            <View style={styles.container}>
                <UserInfoView userData={this.state.userData} parentPage={this} {...this.props}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 22,
    },
    profileBox: {
        marginTop: 38,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loginButton:{
        borderRadius:20,
        width:140,
        marginTop:24,
        height:40,
        overflow:'hidden',
        backgroundColor:'#484848'
    },
    loginText:{
        lineHeight:34,
        fontSize:18,
        textAlign:'center',
        fontWeight:'normal',
        color:'#fff'
    }
    ,
    alias: {
        color: "#484848",
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 6
    },
    description: {
        fontSize: 14,
        color:"#484848",
        marginRight:10
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop:10
    },
    labelContainer:{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:"#eee",
        paddingBottom:10,
        borderTopWidth:1,
        borderTopColor:"#eee",
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10
    }
    ,
    labelBox:{
        flexDirection:'row',
    },
    labelIcon:{
        width:20,
        height:20,
        tintColor:'#484848'
    },
    labelText:{
        marginTop:2,
        marginLeft:8,
        color:'#484848'
    }

})
