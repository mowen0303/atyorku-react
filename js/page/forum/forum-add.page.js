import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput, ListView, StatusBar, Text} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import LoadMoreBar from '../../commonComponent/loadingView';


export default class ForumAddPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = {
        title: '发布',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff'
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <TextInput multiline={true} style={styles.textInput}/>
            </ScrollView>
        )
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

    }
});