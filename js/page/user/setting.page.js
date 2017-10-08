import React, {Component} from 'react'
import {View, ScrollView, StyleSheet, TouchableOpacity, Image, CameraRoll} from 'react-native';
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
                    <View style={styles.labelRight}>
                        <ImageLoad
                            style={styles.avatar}
                            source={{uri: CommonService.host + this.state.userData.img}}
                            placeholderSource={require('../../../res/images/transparence.png')}
                            isShowActivity={false}
                            borderRadius = {25}/>
                        <Image style={styles.rightArrow} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>用户名</Text>
                    <View style={styles.labelRight}>
                        <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.name}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox} onPress={()=>{this.navigationToProfileModifyPage('昵称')}}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>昵称</Text>
                    <View style={styles.labelRight}>
                        <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.alias}</Text>
                        <Image style={styles.rightArrow} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>性别</Text>
                    <View style={styles.labelRight}>
                        <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{CommonService.pipeOfUserGender(this.state.userData.gender)}</Text>
                        <Image style={styles.rightArrow} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>签名</Text>
                    <View style={styles.labelRight}>
                        <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.description}</Text>
                        <Image style={styles.rightArrow} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>专业</Text>
                    <View style={styles.labelRight}>
                        <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.major}</Text>
                        <Image style={styles.rightArrow} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>年级</Text>
                    <View style={styles.labelRight}>
                        <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.enrollYearTranslate}</Text>
                        <Image style={styles.rightArrow} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>学历</Text>
                    <View style={styles.labelRight}>
                        <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.degree}</Text>
                        <Image style={styles.rightArrow} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>修改密码</Text>
                    <View style={styles.labelRight}>
                        <Image style={styles.rightArrow} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>

                <Button onPress={this.logout} style={styles.logoutButton} block><Text>退出</Text></Button>
            </ScrollView>
        )
    }

    navigationToProfileModifyPage(title){
        this.props.navigation.navigate('ProfileModifyPage',{parentPage:this, userData:this.state.userData, title:title});
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
        paddingRight:22,
        paddingTop:20
    },
    listBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        minHeight:66,
        borderBottomWidth:1,
        borderColor:'#ebebeb'
    },
    labelText:{
        fontSize:17,
        color:"#484848",
    },
    labelTextRight:{
        fontSize:15,
        color:"#484848",
        width:250,
        textAlign:'right'
    },
    icon:{
        width:22,
        height:22,
        tintColor:"#484848"
    },
    logoutButton:{
        backgroundColor:'#484848',
        marginTop:40,
        marginBottom:40
    },
    avatar:{
        width:50,
        height:50
    },
    labelRight: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',

    },
    rightArrow: {
        width:18,
        height:18,
        marginLeft:10,
        tintColor:"#ccc"
    }
})