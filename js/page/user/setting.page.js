import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import globalStyle from '../../style/style';
import UserService from './service/user.service';
import {Button, Text} from 'native-base';
import UserInterface from './interface/user.Interface';
import ImageLoad from 'react-native-image-placeholder';
import CommonService from '../../service/common.service';


export default class SettingPage extends Component {



    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.navigation.state.params.userData
        }
    }

    static navigationOptions = {
        headerStyle:{backgroundColor:"#fff"},
        title:'个人设置',
        headerTintColor:"#484848"
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>头像</Text>
                    <ImageLoad
                        style={styles.avatar}
                        source={{uri: CommonService.host + this.state.userData.img}}
                        placeholderSource={require('../../../res/images/transparence.png')}
                        isShowActivity={false}
                        borderRadius = {25}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>我的发布</Text>
                    <Image style={styles.icon} source={require('../../../res/icon/myforum.png')}/>
                </TouchableOpacity>
                <Button onPress={this.logout} style={styles.logoutButton} block><Text>退出</Text></Button>
            </ScrollView>
        )
    }

    navigationToSettingPage = ()=>{
        this.props.navigation.navigate('SettingPage');
    }

    logout = () => {
        UserService.logout()
            .then(json => {
                if (json.code === 1) {
                    UserService.removeUserDataFromLocalStorage();
                    this.props.navigation.state.params.parentPage.setState({userData: new UserInterface()});
                    this.props.navigation.goBack();
                }
                console.log(json);
            })
            .catch(error => {

            })
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        paddingLeft:22,
        paddingRight:22
    },
    listBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:66,
        borderBottomWidth:1,
        borderColor:'#ebebeb'
    },
    labelText:{
        fontSize:17,
        color:"#484848"
    }
    ,
    icon:{
        width:22,
        height:22,
        tintColor:"#484848"
    },
    logoutButton:{
        backgroundColor:'#484848',
        marginTop:40
    },
    avatar:{
        width:50,
        height:50
    }
})