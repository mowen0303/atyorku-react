import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import globalStyle from '../../style/style';
import UserService from './service/user.service';
import {Button, Text} from 'native-base';
import UserInterface from './interface/user.Interface';
import ImageLoad from 'react-native-image-placeholder';
import CommonService from '../../service/common.service';


export default class ProfileModifyPage extends Component {



    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.navigation.state.params.userData
        }
    }

    static navigationOptions = ({navigation})=>({
            headerStyle:{backgroundColor:"#fff"},
            title:navigation.state.params.title,
            headerTintColor:"#484848"
        });


    componentWillMount(){

    }


    render() {
        if(this.props.navigation.state.params.title === "头像"){
            return (
                <ScrollView style={styles.container}>

                </ScrollView>
            )
        }

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
    }
})