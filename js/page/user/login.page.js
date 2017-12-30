import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import globalStyles from '../../style/style';
import UserService from "./service/user.service";
import {LoadMiddle} from "../../commonComponent/loading.component";


export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            showLoginPage: true,
            isLoading: false,
        }
    }

    static navigationOptions = {
        header: null
    }


    render() {
        if (this.state.showLoginPage === true) {
            return (
                <View style={{flex: 1}}>
                    <ScrollView style={styles.container}>
                        <TouchableOpacity
                            onPress={this.goBack}><Image
                            style={styles.back}
                            source={require('../../../res/icon/back2.png')}/>
                        </TouchableOpacity>
                        <Text style={[styles.title, globalStyles.font]}>登录</Text>
                        <KeyboardAvoidingView behavior={"padding"}>
                            <View style={globalStyles.inputBox}>
                                <Image style={styles.icon} source={require('../../../res/icon/user.png')}/>
                                <TextInput
                                    style={[globalStyles.input, globalStyles.fontLight]}
                                    selectionColor={"#484848"}
                                    placeholder={"用户名"}
                                    value={this.state.username}
                                    clearButtonMode={'while-editing'}
                                    underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                    onChangeText={(text) => this.setState({username: text})}/>
                            </View>
                            <View style={globalStyles.inputBox}>
                                <Image style={styles.icon} source={require('../../../res/icon/password.png')}/>
                                <TextInput
                                    style={[globalStyles.input, globalStyles.fontLight]}
                                    selectionColor={"#484848"}
                                    placeholder={"密码"} secureTextEntry={true}
                                    value={this.state.password}
                                    clearButtonMode={'while-editing'}
                                    underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                    onChangeText={(text) => this.setState({password: text})}/>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                disabled={this.state.isLoading}
                                style={styles.button}
                                onPress={this.login}>
                                <Text style={styles.buttonText}>登 录</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.navigateToRegisterPage}
                                style={[styles.button, {width: 150}]}>
                                <Text style={styles.buttonText}>新用户注册</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <LoadMiddle isLoading={this.state.isLoading}/>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <ScrollView style={styles.container}>
                        <TouchableOpacity onPress={this.goBack}>
                            <Image style={styles.back}
                                   source={require('../../../res/icon/back2.png')}/>
                        </TouchableOpacity>
                        <Text style={[styles.title, globalStyles.font]}>注册一个新用户</Text>
                        <KeyboardAvoidingView behavior={"padding"}>
                            <View style={globalStyles.inputBox}>
                                <Image style={styles.icon} source={require('../../../res/icon/user.png')}/>
                                <TextInput
                                    style={[globalStyles.input, globalStyles.fontLight]}
                                    selectionColor={"#484848"}
                                    placeholder={"用户名"}
                                    value={this.state.username}
                                    clearButtonMode={'while-editing'}
                                    underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                    onChangeText={(text) => this.setState({username: text})}/>
                            </View>
                            <View style={globalStyles.inputBox}>
                                <Image style={styles.icon} source={require('../../../res/icon/password.png')}/>
                                <TextInput
                                    style={[globalStyles.input, globalStyles.fontLight]}
                                    selectionColor={"#484848"}
                                    placeholder={"密码"} secureTextEntry={true}
                                    value={this.state.password}
                                    clearButtonMode={'while-editing'}
                                    underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                    onChangeText={(text) => this.setState({password: text})}/>
                            </View>
                            <View style={globalStyles.inputBox}>
                                <Image style={styles.icon} source={require('../../../res/icon/password.png')}/>
                                <TextInput
                                    style={[globalStyles.input, globalStyles.fontLight]}
                                    selectionColor={"#484848"}
                                    placeholder={"密码"} secureTextEntry={true}
                                    value={this.state.password2}
                                    clearButtonMode={'while-editing'}
                                    underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                    onChangeText={(text) => this.setState({password2: text})}/>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} disabled={this.state.isLoading} style={styles.button}
                                              rounded info block
                                              onPress={this.register}><Text
                                style={styles.buttonText}>注册</Text></TouchableOpacity>
                        </KeyboardAvoidingView>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.navigateToLoginPage}
                                              style={[styles.button, {width: 150}]} rounded info block><Text
                                style={styles.buttonText}>用户登录</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                    <LoadMiddle isLoading={this.state.isLoading}/>
                </View>
            );
        }


    }

    goBack = () => {
        this.props.navigation.goBack();
        StatusBar.setBarStyle('dark-content', false);
    }

    login = () => {
        if (this.state.username === "" || this.state.password === "") {
            Alert.alert("登录错误", "请填写用户名或密码");
            return false;
        }

        this.setState({isLoading: true})
        UserService.login(this.state.username, this.state.password)
            .then((json) => {
                if (json.code === 1) {
                    UserService.setUserDataToLocalStorage(json.result);
                    this.props.navigation.state.params.parentPage.getUserData();
                    this.props.navigation.goBack();
                } else {
                    Alert.alert("登录错误", json.message);
                }
                console.log(json);
                this.setState({isLoading: false});
            })
            .catch((error) => {
                this.setState({isLoading: false})
            })
    }

    navigateToRegisterPage = () => {
        this.setState({showLoginPage: false})
    }

    navigateToLoginPage = () => {
        this.setState({showLoginPage: true})
    }

    register = () => {
        if (this.state.username === "" || this.state.password === "" || this.state.password2 === "") {
            Alert.alert("请输入用户名和密码");
            return false;
        }
        if (this.state.password !== this.state.password2) {
            Alert.alert("两次密码不一样");
            return false;
        }
        this.setState({isLoading: true});
        let resultPromise = UserService.register(this.state.username, this.state.password);
        resultPromise.then(json => {
            if (json.code === 1) {
                UserService.setUserDataToLocalStorage(json.result);
                this.props.navigation.state.params.parentPage.setState({userData: json.result});
                this.props.navigation.goBack();
            } else {
                Alert.alert(json.message);
            }
            this.setState({isLoading: false});
        })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
                Alert.alert("网路环境异常");
            })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 0
    },
    back: {
        width: 26,
        height: 26,
        marginTop: 40
    },
    title: {
        fontSize: 26,
        marginBottom: 0,
        marginTop: 30
    }
    ,
    icon: {
        width: 24,
        height: 24,
        tintColor: '#484848',
    },
    button: {
        marginTop: 50,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#484848',
        borderRadius: 4
    },
    buttonText: {
        color: '#fff',
    }
})