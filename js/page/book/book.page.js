import React, {Component} from 'react';
import {View, StyleSheet,Image, TouchableOpacity,Text, Alert} from 'react-native';
import BookService from './service/book.service';
import BookListView from './component/book-list-view.component';
import UserService from "../user/service/user.service";

export default class BookPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            booksData: null,
            loadingMore: false,
            isLoadingBooks:false,
        }
    }
    static navigationOptions  = ({navigation}) => {
        return {
            statusBarStyle: 'dark-content',
            title:'二手书',
            headerStyle:{backgroundColor:'#0e7477'},
            headerTintColor:'#fff',
            headerBackTitle:null,
            headerRight: <TouchableOpacity onPress={()=>{navigation.state.navigateToAddPage()}}><Image style={styles.addBtn} source={require('../../../res/icon/add.png')}/></TouchableOpacity>
        }
    }

    navigateToAddPage = ()=>{
        UserService.getUserDataFromLocalStorage()
            .then(result=>{
                if(result !== null){
                    this.props.navigation.navigate('BookAddPage', {bookPage:this});
                }else{
                    Alert.alert("提示","请先登录");
                }
            })
            .catch(error=>{
                Alert.alert("提示",error);
            })
    }

    async componentDidMount(){
        this.props.navigation.state.navigateToAddPage = this.navigateToAddPage;
    }

    render() {
        return (
            <View style={styles.container}>
                <BookListView ref="bookListView" {...this.props} />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    navigationBar: {
        backgroundColor: '#fff',
    },
    navBtnView: {
        flexDirection: 'row'
    },
    navBtnImg: {
        width: 18,
        height: 18,
        marginLeft: 5,
        marginRight: 5,
        tintColor: '#fff'
    },
    addBtn:{
        tintColor:"#fff",
        width:18,
        height:18,
        marginRight:10
    }
});
