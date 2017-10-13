import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet,KeyboardAvoidingView, Alert, Platform, TouchableOpacity,Text, Image, TextInput, Picker, DatePickerAndroid, DatePickerIOS} from 'react-native';
import globalStyle from '../../style/style';
import UserService from './service/user.service';
import {LoadMiddle} from "../../commonComponent/loadingView";
import CommonService from "../../service/common.service";



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
            gender: this.props.navigation.state.params.userData.gender,
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
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={this.updateAlias}><Text style={styles.buttonText}>提交</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "性别") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateGender('1')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>男</Text>
                            <View style={globalStyle.listLabelRight}>
                                {this.elementSelectedIcon('1',this.state.gender)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateGender('0')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>女</Text>
                            <View style={globalStyle.listLabelRight}>
                                {this.elementSelectedIcon('0',this.state.gender)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateGender('2')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>不明</Text>
                            <View style={globalStyle.listLabelRight}>
                                {this.elementSelectedIcon('2',this.state.gender)}
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
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=>{this.updateDescription()}}><Text style={styles.buttonText}>提交</Text></TouchableOpacity>
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
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=>{this.updateMajor()}}><Text style={styles.buttonText}>提交</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "入学时间") {
            return (

                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.9} style={[globalStyle.inputBox]} onPress={()=>{this.openDataPicker()}}>
                            <Text style={[globalStyle.input, globalStyles.fontLight,{paddingBottom:0}]}>{CommonService.pipeOfUserEnrolmentYear(this.state.enrollYear)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=>{this.updateEnrollYear()}}><Text style={styles.buttonText}>提交</Text></TouchableOpacity>
                    </ScrollView>
                    {this.elementDataPickerIOS()}
                </View>
            )
        } else if(this.props.navigation.state.params.title === "学历") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateDegree('本科')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>本科</Text>
                            <View style={globalStyle.listLabelRight}>
                                {this.elementSelectedIcon('本科',this.state.degree)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateDegree('研究生')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>研究生</Text>
                            <View style={globalStyle.listLabelRight}>
                                {this.elementSelectedIcon('研究生',this.state.degree)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyle.listBox} onPress={()=>{this.updateDegree('博士')}}>
                            <Text style={[globalStyle.fontLight, styles.labelText]}>博士</Text>
                            <View style={globalStyle.listLabelRight}>
                                {this.elementSelectedIcon('博士',this.state.degree)}
                            </View>
                        </TouchableOpacity>
                        <LoadMiddle isLoading={this.state.isLoading}/>
                    </ScrollView>
                </View>
            )
        }  else if(this.props.navigation.state.params.title === "修改密码") {
            return (
                <View style={{flex:1}}>
                    <KeyboardAvoidingView style={styles.container} keyboardShouldPersistTaps={"always"}>
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
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=>{this.updatePassword()}}><Text style={styles.buttonText}>提交</Text></TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            )
        }

    }

    elementSelectedIcon(currentVal,targetVal){
        if(currentVal === targetVal){
            return <Image style={globalStyle.listLabelRightIcon} source={require('../../../res/icon/selected.png')}/>;
        }
    }
    updateAlias = ()=>{
        this.setState({isLoading:true});
        this.refs.textInputRefer.blur();
        let resultPromise = UserService.updateAlias(this.state.alias);
        this.handleUpdateResult(resultPromise);
    }
    updateGender(gender){
        this.setState({isLoading:true,gender:gender});
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
    elementDataPickerIOS(){
        if (Platform.OS === 'ios'){
            return (
                <View>
                    <DatePickerIOS style={{backgroundColor:'#fff'}}
                                   date={new Date(this.state.enrollYear*1000)}
                                   mode="date"
                                   onDateChange={this.onDateChange}
                                   minimumDate = {new Date("1960/1/1")}
                                   maximumDate = {new Date()}
                    />
                </View>
            )
        }
    }
    onDateChange=(date)=>{
        this.setState({enrollYear:date.getTime()/1000});
    }
    async openDataPicker(){
        if (Platform.OS !== 'ios'){
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
                    this.setState({enrollYear:dateObj.getTime()/1000});
                }
            } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
            }
        }

    }
    updateEnrollYear(){
        this.setState({isLoading:true});
        let resultPromise = UserService.updateEnrollYear(this.state.enrollYear);
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
                Alert.alert(json.message);
                this.props.navigation.goBack();
            }else{
                Alert.alert(json.message);
            }
            this.setState({isLoading:false});
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
                UserService.setUserDataToLocalStorage(json.result);
                this.props.navigation.state.params.parentPage.setState({userData:json.result});
                this.props.navigation.goBack();
            }else{
                Alert.alert(json.message);
            }
            this.setState({isLoading:false});
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
        paddingVertical:12,
        borderRadius:6,
        marginHorizontal:70
    },
    buttonText:{
        color:"#fff",
        textAlign:'center'
    }
})