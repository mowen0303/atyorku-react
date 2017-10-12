import React, {Component} from 'react'
import {View, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, CameraRoll} from 'react-native';
import globalStyle from '../../style/style';
import UserService from './service/user.service';
import {Button, Text} from 'native-base';
import UserInterface from './interface/user.Interface';
import CommonService from '../../service/common.service';
import ImagePicker from 'react-native-image-picker';
import {LoadMiddle} from "../../commonComponent/loadingView";


export default class SettingPage extends Component {



    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.navigation.state.params.userData,
            isLoading:false,
            isLoadingText:"",
        }
    }

    static navigationOptions = {
        headerStyle:{backgroundColor:"#fff"},
        title:'个人设置',
        headerTintColor:"#484848"
    }

    componentDidMount(){
        console.log(fetch("http://www.atyorku.ca"));
    }

    componentWillUnmount(){
        this.props.navigation.state.params.parentPage.getUserData();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.pickUpPhoto()}}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>头像</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Image  style={styles.avatar} source={{uri: CommonService.host + this.state.userData.img}}/>
                            <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View activeOpacity={0.7} style={globalStyle.listBox}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>用户名</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.name}</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.navigationToProfileModifyPage('昵称')}}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>昵称</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.alias}</Text>
                            <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.navigationToProfileModifyPage('性别')}}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>性别</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{CommonService.pipeOfUserGender(this.state.userData.gender)}</Text>
                            <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.navigationToProfileModifyPage('签名')}}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>签名</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.description}</Text>
                            <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.navigationToProfileModifyPage('专业')}}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>专业</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.major}</Text>
                            <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.navigationToProfileModifyPage('年级')}}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>年级</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{CommonService.pipeOfUserEnrolmentYear(this.state.userData.enroll_year)}</Text>
                            <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.navigationToProfileModifyPage('学历')}}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>学历</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyle.fontLight, styles.labelTextRight]}>{this.state.userData.degree}</Text>
                            <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.navigationToProfileModifyPage('修改密码')}}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>修改密码</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <Button onPress={this.logout} style={styles.logoutButton} block><Text>退出</Text></Button>
                </ScrollView>
                <LoadMiddle isLoading={this.state.isLoading} text={this.state.isLoadingText}/>
            </View>
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

    pickUpPhoto(){
        let options = {
            title: '上传头像',
            allowsEditing:true,
            maxWidth:300,
            maxHeight:300,
            quality:0.8,
            takePhotoButtonTitle:"拍照",
            chooseFromLibraryButtonTitle:"打开相册",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                //success
                await this.setState({isLoading:true});
                UserService.updateAvatar(response.uri,
                    (progress)=>{
                        console.log(progress);
                        this.setState({isLoadingText:"上传进度"+progress});
                    },
                    async (json)=>{
                        console.log(json);
                        if(json.code === 1){
                            UserService.setUserDataToLocalStorage(json.result);
                            await this.setState({userData:json.result});
                            this.setState({isLoading:false});
                        }else{
                            console.log(response.uri);
                            Alert.alert(json.message+":"+response.uri);
                        }
                    },
                    ()=>{
                        this.setState({isLoading:false});
                    });
                let userData = this.state.userData;
            }
        });
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
        width:60,
        height:60,
        borderRadius:30,
        marginBottom:10
    }
});