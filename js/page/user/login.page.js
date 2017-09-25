import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import globalStyles from '../../style/style';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    static navigationOptions = {
        title: '注册',
        headerStyle: {backgroundColor: "#fff"},
        headerTintColor: "#484848"
    }

    componentDidMount() {
        // alert(this.props)
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputBox}>
                    <Image style={styles.icon} source={require('../../../res/icon/user.png')}/>
                    <TextInput
                        style={[styles.input, globalStyles.fontLight]}
                        placeholder={"用户名"}
                        value={this.state.username}
                        clearButtonMode={'while-editing'}
                        onChangeText={(text) => this.setState({username: text})}/>
                </View>
                <View style={styles.inputBox}>
                    <Image style={styles.icon} source={require('../../../res/icon/password.png')}/>
                    <TextInput style={[styles.input, globalStyles.fontLight]}
                               placeholder={"密码"} secureTextEntry={true}
                               value={this.state.password}
                               clearButtonMode={'while-editing'}
                               onChangeText={(text) => this.setState({password: text})}/>
                </View>
                <TouchableOpacity color="#841584" style={styles.button}><Text>登录</Text></TouchableOpacity>
            </ScrollView>
        );
    }

    // goBack = ()=>{
    //     this.props.navigation.goBack();
    // }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    inputBox:{
        flexDirection:'row',
        flex:1,
        marginTop:50
    },
    icon:{
        width:24,
        height:24,
        tintColor:'#ccc',
        marginTop:6
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
        color:"#484848",
        marginLeft:16,
        flex:1

    },
    button:{
        backgroundColor:'#000',
        borderWidth:1,
        color:'#fff'
    }
})