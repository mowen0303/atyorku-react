import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, StatusBar, Image} from 'react-native';
import LoginPage from './login.page';
import globalStyles from '../../style/style';
import GenderIcon from '../../commonComponent/gender-icon.component';
import UserService from './service/user.service';
import UserInterface from './interface/user.Interface';

export default class HomePage extends Component {

    user = new UserInterface();

    constructor(props) {
        super(props);
        this.state = {
            user:this.user
        }
    }

    static navigationOptions = {
        //headerStyle:{backgroundColor:'#fff',shadowColor:'transparent'}
        header: null,
    }

    // componentDidMount() {
    //     this.props.navigation.setParams({login: this.login})
    // }

    componentDidMount() {
        //alert(this.user.id)
    }

    login = () => {
        this.props.navigation.navigate('LoginPage')
    }


    render() {

        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.profileBox}>
                        <View style={{flex: 1, marginRight: 10}}>
                            {this.elementOfAlias(this.state.user.alias)}
                            <Text numberOfLines={2} style={[styles.description, globalStyles.fontLight]}>{this.state.user.description}</Text>
                        </View>
                        <View>
                            {this.elementOfAvatar(this.state.user.img)}
                            <GenderIcon genderStyle={{position: 'absolute', top: 59, right: 23}} gender={this.state.user.gender}/>
                        </View>
                    </View>
                    <View style={styles.labelContainer}>
                        <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../res/icon/faculty.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}>{this.state.user.major}</Text></View>
                        <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../res/icon/grade.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}>{this.state.user.enroll_year}</Text></View>
                        <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../res/icon/degree.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}>{this.state.user.degree}</Text></View>
                    </View>
                    <Text onPress={()=>{UserService.login('jerry','mowen0303').then((json)=>{console.log(json)})}}>Test</Text>
                </ScrollView>
            </View>
        );
    }

    elementOfAlias(alias){
        if(alias != "" || alias != null){
            return (
                <Text style={[styles.alias, styles.loginButton, globalStyles.font]} onPress={this.login}>登录</Text>
            );
        }else{
            return (
                <Text style={[styles.alias, globalStyles.font]}>{alias}</Text>
            );
        }
    }

    elementOfAvatar(avatar){
        if(avatar != "" || avatar != null){
            return (
                <Image style={styles.avatar} source={require('../../../res/images/head-default.png')}/>
            );
        }else{
            return (
                <Image style={styles.avatar} source={require('../../../res/images/test.jpg')}/>
            );
        }
    }

    login = ()=>{
        this.props.navigation.navigate('LoginPage');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 22
    },
    profileBox: {
        marginTop: 38,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loginButton:{
        borderWidth:1,
        textAlign:'center',
        borderRadius:20,
        fontSize:18,
        width:140,
        marginTop:24,
        height:40,
        lineHeight:40,
        borderColor:'#aaa',
        fontWeight:'normal'
    },
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
