import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        //headerStyle:{backgroundColor:'#fff',shadowColor:'transparent'}
        header:null
    }

    componentDidMount() {
        // alert(this.props)
    }

    render(){

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.goBack}>
                    <Image style={styles.btn} source={require('../../../res/icon/back.png')} />
                </TouchableOpacity>
            </View>
        );
    }

    goBack = ()=>{
        this.props.navigation.goBack();
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#0e7477'
    },
    btn:{
        tintColor:"#000"
    }
})