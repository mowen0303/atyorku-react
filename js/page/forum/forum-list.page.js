import React, {Component} from 'react';
import {View, StyleSheet,Image, TouchableOpacity, Alert} from 'react-native';
import ForumService from './service/forum.service';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import ForumListView from './component/forum-list-view.component';
import UserService from "../user/service/user.service";

const renderTabBar = props => (
    <DefaultTabBar {...props} style={{borderBottomWidth: 1, borderBottomColor: '#f4f4f4', height: 40, borderTopWidth:0}}/>);

export default class ForumListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesData: [],
            loadingMore: false
        }
    }
    static navigationOptions  = ({navigation}) => {
        return {
            title:'同学圈',
            headerStyle:{backgroundColor:'#0e7477'},
            headerTintColor:'#fff',
            headerRight: <TouchableOpacity onPress={()=>{navigation.state.navigateToAddPage()}}><Image style={styles.addBtn} source={require('../../../res/icon/add.png')}/></TouchableOpacity>
        }
    }

    componentWillMount(){
        this.props.navigation.state.navigateToAddPage = this.navigateToAddPage;
    }

    render() {
        return (

            <View style={styles.container}>
                <ScrollableTabView renderTabBar={renderTabBar}
                                   tabBarBackgroundColor={'#fff'}
                                   tabBarActiveTextColor={'#0e7477'}
                                   tabBarInactiveTextColor={'#aaa'}
                                   tabBarTextStyle={{marginTop: 10, fontSize: 15}}
                                   tabBarUnderlineStyle={{backgroundColor: '#0e7477', height: 2, borderRadius: 1}}>
                    <ForumListView {...this.props} categoryId="0" tabLabel="全部"/>
                    <ForumListView {...this.props} categoryId="1" tabLabel="杂谈"/>
                    <ForumListView {...this.props} categoryId="5" tabLabel="约"/>
                    <ForumListView {...this.props} categoryId="4" tabLabel="讨论"/>
                    <ForumListView {...this.props} categoryId="3" tabLabel="交易"/>
                </ScrollableTabView>

            </View>
        )
    }

    navigateToAddPage = ()=>{
        UserService.getUserDataFromLocalStorage()
            .then(result=>{
                if(result!==null){
                    this.props.navigation.navigate('ForumAddPage');
                }else{
                    Alert.alert("提示","请先登录");
                }
            })
            .catch(error=>{
                Alert.alert("提示","请先登录");
            })

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
