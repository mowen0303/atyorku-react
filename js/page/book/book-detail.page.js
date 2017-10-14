import React, {Component} from 'react'
import {View, StyleSheet, Button} from 'react-native';


export default class BookDetailPage extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = {
        headerStyle:{backgroundColor:"#fff"},
        title:'二手书',
        headerTintColor:"#484848"
    }

    componentDidMount () {

    }

    render(){

        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    }
})
