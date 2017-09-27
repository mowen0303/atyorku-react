import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import globalStyles from '../../style/style';
import {Button, Text} from 'native-base';
import UserService from "./service/user.service";
import {LoadMiddle} from "../../commonComponent/loadingMore";

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            title: "登录",
            isLoading:false,
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params)
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    <TouchableOpacity onPress={this.goBack}><Image style={styles.back}
                                                                   source={require('../../../res/icon/back2.png')}/></TouchableOpacity>
                    <Text style={[styles.title, globalStyles.font]}>{this.state.title}</Text>
                    <View style={styles.inputBox}>
                        <Image style={styles.icon} source={require('../../../res/icon/user.png')}/>
                        <TextInput
                            style={[styles.input, globalStyles.fontLight]}
                            selectionColor={"#484848"}
                            placeholder={"用户名"}
                            value={this.state.username}
                            clearButtonMode={'while-editing'}
                            onChangeText={(text) => this.setState({username: text})}/>
                    </View>
                    <View style={styles.inputBox}>
                        <Image style={styles.icon} source={require('../../../res/icon/password.png')}/>
                        <TextInput
                            style={[styles.input, globalStyles.fontLight]}
                            selectionColor={"#484848"}
                            placeholder={"密码"} secureTextEntry={true}
                            value={this.state.password}
                            clearButtonMode={'while-editing'}
                            onChangeText={(text) => this.setState({password: text})}/>
                    </View>
                    <Button disabled={this.state.isLoading} style={styles.button} rounded info block onPress={this.login}><Text>登 录</Text></Button>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Button onPress={this.register} style={[styles.button, {width: 100}]} rounded info block><Text>注
                            册</Text></Button>
                    </View>
                </ScrollView>
                <LoadMiddle isLoadingMore={this.state.isLoading}/>
            </View>
        );
    }

    goBack = () => {
        this.props.navigation.goBack();
        StatusBar.setBarStyle('dark-content', false);
    }

    login = () => {
        if(this.state.username === "" || this.state.password === "" ){
            Alert.alert("登录错误","请填写用户名或密码");
            return false;
        }

        this.setState({isLoading:true})
        UserService.login(this.state.username, this.state.password)
            .then((json) => {
                if (json.code === 1) {
                    UserService.setUserDataToLocalStorage(json.result);
                    this.props.navigation.state.params.parentPage.getUserData();
                    this.props.navigation.goBack();
                }else{
                    Alert.alert("登录错误",json.message);
                }
                console.log(json);
                this.setState({isLoading:false});
            })
            .catch((error) => {
                this.setState({isLoading:false})
            })
    }


    register = () => {
        // UserService.getUserDataFromLocalStorage().then(
        //     (res) => {
        //         let a = JSON.parse(res);
        //         console.log(typeof a)
        //         console.log(a)
        //     });

        UserService.getUserDataFromLocalStorage((data)=>{
            console.log(typeof data)
            console.log(data);
        });
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
    inputBox: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#484848',
    },
    input: {
        paddingBottom: 10,
        color: "#484848",
        marginLeft: 14,
        flex: 1,
        marginTop: 3

    },
    button: {
        marginTop: 50,
        backgroundColor: '#484848'
    }
})