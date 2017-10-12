import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet, Alert, Platform, TouchableOpacity,Text, Image, TextInput, Picker, DatePickerAndroid} from 'react-native';
import globalStyle from '../../style/style';
import UserService from './service/user.service';
import {LoadMiddle} from "../../commonComponent/loadingView";



export default class ProfileModifyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alias: this.props.navigation.state.params.userData.alias,
            description: this.props.navigation.state.params.userData.description,
            major: this.props.navigation.state.params.userData.major,
            enrollYear: this.props.navigation.state.params.userData.enroll_year,
            enrollYearTranslate: this.props.navigation.state.params.userData.enrollYearTranslate,
            degree: this.props.navigation.state.params.userData.degree,
            oldPwd: "",
            newPwd: "",
            newPwd2: "",
            isLoading:false,
        }
    }

    static navigationOptions = ({navigation})=>({
            headerStyle:{backgroundColor:"#fff"},
            title:navigation.state.params.title,
            headerTintColor:"#484848"
    });

    render() {
        if(this.props.navigation.state.params.title === "昵称"){
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyle.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"昵称"}
                                value={this.state.alias}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                onChangeText={(text) => this.setState({alias: text})}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={this.updateAlias}><Text style={styles.buttonText}>提 交</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "性别") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateGender(1)}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>男</Text>
                            <View style={globalStyle.listLabelRight}>
                                <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateGender(0)}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>女</Text>
                            <View style={globalStyle.listLabelRight}>
                                <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateGender(2)}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>不明</Text>
                            <View style={globalStyle.listLabelRight}>
                                <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                            </View>
                        </TouchableOpacity>
                        <LoadMiddle isLoading={this.state.isLoading}/>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "签名") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyle.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"签名"}
                                value={this.state.description}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                onChangeText={(text) => this.setState({description: text})}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=>{this.updateDescription()}}><Text style={styles.buttonText}>提 交</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "专业") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyle.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"专业"}
                                value={this.state.major}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                onChangeText={(text) => this.setState({major: text})}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=>{this.updateMajor()}}><Text style={styles.buttonText}>提 交</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "年级") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.9} style={globalStyle.inputBox} onPress={()=>{this.openDataPicker()}}>
                            <Text style={[globalStyle.input, globalStyles.fontLight,{height:50}]}>{this.state.enrollYearTranslate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=>{this.updateMajor()}}><Text style={styles.buttonText}>提 交</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "学历") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateDegree('本科')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>本科</Text>
                            <View style={globalStyle.listLabelRight}>
                                <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateDegree('研究生')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>研究生</Text>
                            <View style={globalStyle.listLabelRight}>
                                <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateDegree('博士')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>博士</Text>
                            <View style={globalStyle.listLabelRight}>
                                <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                            </View>
                        </TouchableOpacity>
                        <LoadMiddle isLoading={this.state.isLoading}/>
                    </ScrollView>
                </View>
            )
        }  else if(this.props.navigation.state.params.title === "修改密码") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyle.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"请输入现用密码"}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({oldPwd: text})}/>
                        </View>
                        <View style={globalStyle.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyle.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"新密码"}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({newPwd: text})}/>
                        </View>
                        <View style={globalStyle.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyle.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"确认新密码"}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({newPwd2: text})}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=>{this.updatePassword()}}><Text style={styles.buttonText}>提 交</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            )
        }

    }

    updateAlias = ()=>{
        this.setState({isLoading:true});
        this.refs.textInputRefer.blur();
        let resultPromise = UserService.updateAlias(this.state.alias);
        this.handleUpdateResult(resultPromise);
    }

    updateGender(gender){
        this.setState({isLoading:true});
        let resultPromise = UserService.updateGender(gender);
        this.handleUpdateResult(resultPromise);

    }
    updateMajor(){
        this.setState({isLoading:true});
        let resultPromise = UserService.updateMajor(this.state.major);
        this.handleUpdateResult(resultPromise);

    }
    updateWechat(wechat){
        this.setState({isLoading:true});
        let resultPromise = UserService.updateWechat(wechat);
        this.handleUpdateResult(resultPromise);

    }
    updateDescription(){
        this.setState({isLoading:true});
        let resultPromise = UserService.updateDescription(this.state.description);
        this.handleUpdateResult(resultPromise);

    }
    async openDataPicker(){
        if (Platform.OS === 'ios'){

        }else{
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: new Date()
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day
                    let time = `${year}/${month}/${day}`;
                    let dateObj = new Date(time);
                    let timeStamp = dateObj.getTime()/1000;
                    this.updateEnrollYear(timeStamp);
                }
            } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
            }
        }

    }
    updateEnrollYear(enrollYear){
        this.setState({isLoading:true});
        let resultPromise = UserService.updateEnrollYear(enrollYear);
        this.handleUpdateResult(resultPromise);

    }
    updateDegree(degree){
        this.setState({isLoading:true});
        let resultPromise = UserService.updateDegree(degree);
        this.handleUpdateResult(resultPromise);

    }
    updatePassword(){
        this.setState({isLoading:true});
        if(this.state.newPwd ==="" || this.state.newPwd2==="" || this.state.oldPwd ===""){
            Alert.alert("请输入密码");
            return false;
        }
        if(this.state.newPwd !== this.state.newPwd2) {
            Alert.alert("两次新密码不一样");
            return false;
        }
        this.setState({isLoading:true});
        let resultPromise = UserService.updatePassword(this.state.oldPwd,this.state.newPwd);
        resultPromise.then(json=>{
            if(json.code===1){
                    this.setState({isLoading:false});
                    Alert.alert(json.message);
                    this.props.navigation.goBack();
                }else{
                    Alert.alert(json.message);
                }
            })
            .catch(error=>{
                console.log(error);
                this.setState({isLoading:false});
                Alert.alert("网路环境异常");
            })
    }


    handleUpdateResult(result){
        result.then(json=>{
            if(json.code===1){
                this.setState({isLoading:false});
                UserService.setUserDataToLocalStorage(json.result);
                this.props.navigation.state.params.parentPage.setState({userData:json.result});
                this.props.navigation.goBack();
            }else{
                Alert.alert(json.message);
            }
        })
        .catch(error=>{
            console.log(error);
            this.setState({isLoading:false});
            Alert.alert("网路环境异常");
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        paddingLeft:22,
        paddingRight:22,

    },
    button:{
        backgroundColor:"#484848",
        marginTop:20,
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:18,
        marginHorizontal:100
    },
    buttonText:{
        color:"#fff",
        textAlign:'center'
    }
})