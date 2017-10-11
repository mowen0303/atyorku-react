import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet, Alert, Button, TouchableOpacity,Text, Image, TextInput, Picker} from 'react-native';
import globalStyle from '../../style/style';
import UserService from './service/user.service';
import UserInterface from './interface/user.Interface';
import {LoadMiddle} from "../../commonComponent/loadingView";



export default class ProfileModifyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alias: this.props.navigation.state.params.userData.alias,
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
                <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                    <View style={{alignItems:'center'}}>
                        <View style={globalStyle.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyle.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                autoFocus={true}
                                placeholder={"密码"}
                                value={this.state.alias}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                onChangeText={(text) => this.setState({alias: text})}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={this.updateAlias}><Text style={styles.buttonText}>提 交</Text></TouchableOpacity>
                        <LoadMiddle isLoading={this.state.isLoading}/>
                    </View>

                </ScrollView>
            )
        }
    }

    updateAlias = ()=>{
        this.setState({isLoading:true});
        this.refs.textInputRefer.blur();
        let resultPromise = UserService.updateAlias(this.state.alias);
        this.handleUpdateResult(resultPromise);
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
        borderRadius:18
    },
    buttonText:{
        color:"#fff",
    }
})