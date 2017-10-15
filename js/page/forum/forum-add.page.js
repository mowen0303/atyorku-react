import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput, Picker,TouchableOpacity, LayoutAnimation, ListView, StatusBar, Text} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import LoadMoreBar from '../../commonComponent/loadingView';


export default class ForumAddPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            category:null,
            bottom: -250,
        }
    }

    static navigationOptions = {
        title: '发布',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff'
    }


    render() {

        return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <TextInput multiline={true} style={styles.textInput}/>
                <Text onPress={()=>{this.openPicker()}}>123</Text>
            </ScrollView>
            <View style={{backgroundColor:'#eee',position:'absolute', left:0,right:0, bottom:this.state.bottom}}>
                <View style={styles.doneBox}><TouchableOpacity onPress={()=>{this.closePicker()}} style={styles.doneBtn}><Text style={styles.doneText}>完成</Text></TouchableOpacity></View>
                <Picker selectedValue={this.state.language} onValueChange={(category) => this.setState({language: category})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        </View>
        )
    }

    openPicker(){
        LayoutAnimation.easeInEaseOut();
        this.setState({bottom:0})
    }

    closePicker(){
        LayoutAnimation.easeInEaseOut();
        this.setState({bottom:-250})
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding:16,
    },
    textInput:{
        backgroundColor:'#fff',
        height:150,
        fontSize:16,
        padding:10

    },
    doneBox:{
        height:40,
        justifyContent:'flex-end',
        flexDirection:'row',
        backgroundColor:'#fff',
        borderTopWidth:1,
        borderTopColor:'#e4e4e4'
    },
    doneBtn:{
        width:80,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center",
    },
    doneText:{
        color:'#0e7477'
    }
});