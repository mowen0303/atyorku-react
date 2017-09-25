import React, {Component} from 'react'
import {View, StyleSheet, Button, StatusBar} from 'react-native';
import {StackNavigator} from "react-navigation";
import LoginPage from '../user/login.page'

export default class HomePage extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: <Button title={"登录"} color="#000" onPress={() => navigation.state.params.login()} />
        }
    }

    componentDidMount () {
        this.props.navigation.setParams({ login: this.login })
    }

    login = ()=>{
        this.props.navigation.navigate('LoginPage')
        // console.log(this.props.navigation);
        //alert(1)
        //console.log(this.props);
    }


    render(){

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#0e7477"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    rightBtn:{

    }
})
