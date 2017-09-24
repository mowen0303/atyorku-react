import React, {Component} from 'react'
import {View, StyleSheet, Button, Alert} from 'react-native';
import {StackNavigator} from "react-navigation";
import LoginPage from '../login/login.page'

export default class HomePage extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: <Button title={"test"} onPress={() => navigation.state.params.login()} />
        }
    }

    componentDidMount () {
        this.props.navigation.setParams({ login: this.login })
    }

    login = ()=>{
        this.props.navigation.navigate('ForumDetailPage', {name: 'Lucy'})
        // console.log(this.props.navigation);
        //alert(1)
        //console.log(this.props);
    }


    render(){

        return (
            <View style={styles.container}>
                <Button title={"test"} onPress={() => {this.props.navigation.navigate('LoginPage', {data: this.props.data});}}/>
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
