import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text, Alert} from 'react-native';
import ForumService from './service/forum.service';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import ForumListView from './component/forum-list-view.component';
import UserService from "../user/service/user.service";
import {LoadMiddle} from '../../commonComponent/loading.component';


const renderTabBar = props => (<DefaultTabBar {...props} style={{
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    height: 40,
    borderTopWidth: 0
}}/>);

export default class ForumListPage extends Component {

    currentForumListView = null;
    forumListArr = [];

    constructor(props) {
        super(props);
        this.state = {
            categoriesData: null,
            loadingMore: false,
            isLoadingCategories: false,
            tabViewPage: 0,
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            statusBarStyle: 'dark-content',
            title: '同学圈',
            headerStyle: {backgroundColor: '#0e7477'},
            headerTintColor: '#fff',
            headerBackTitle: null,
            headerRight: <TouchableOpacity style={styles.addButton} onPress={() => {
                navigation.state.navigateToAddPage()
            }}><Image style={styles.navigationButton} source={require('../../../res/icon/add.png')}/></TouchableOpacity>
        }
    }

    async componentDidMount() {
        this.props.navigation.state.navigateToAddPage = this.navigateToAddPage;
        this.getCategories();
    }

    render() {
        return (
            <View style={styles.container}>
                {this.elementScrollableTableView()}
                <LoadMiddle isLoading={this.state.isLoadingCategories}/>
            </View>
        )
    }



    async getCategories() {
        await this.setState({isLoadingCategories: true});
        ForumService.getCategories()
            .then(async json => {
                await this.setState({isLoadingCategories: false});
                if (json.code === 1) {
                    await this.setState({categoriesData: json.result});
                } else {
                    Alert.alert('提示', json.message);
                }

            })
            .catch(error => {
                this.setState({isLoadingCategories: false});
                Alert.alert('网络环境异常');
            })
    }

    elementScrollableTableView() {
        if (this.state.categoriesData !== null) {

            return (
                <ScrollableTabView
                    page={this.state.tabViewPage}
                    ref="scrollableTabView"
                    onChangeTab={(tab)=>{this.registerForumListView(tab)}}
                    renderTabBar={renderTabBar}
                    tabBarBackgroundColor={'#fff'}
                    tabBarActiveTextColor={'#0e7477'}
                    tabBarInactiveTextColor={'#aaa'}
                    tabBarTextStyle={{marginTop: 10, fontSize: 15}}
                    tabBarUnderlineStyle={{backgroundColor: '#0e7477', height: 2, borderRadius: 1}}
                >


                    {this.state.categoriesData.map(category => <ForumListView ref={(view)=>{this.currentForumListView = view; this.registerForumListView()}}
                                                                              categoryData = {category}
                                                                              key={category.id}
                                                                              {...this.props}
                                                                              categoryId={category.id}
                                                                              tabLabel={category.title}/>)}
                </ScrollableTabView>
            )
        }
    }

    registerForumListView = (tab)=>{
        if(this.forumListArr.length===0){
            this.forumListArr.push({index:0,page:this.currentForumListView})
        }else{
            if(!tab) return false;
            let result = this.forumListArr.find(item=>item.index === tab.i);
            if(result){
                this.currentForumListView = result.page
            }else{
                this.forumListArr.push({index:tab.i,page:this.currentForumListView});
            }
        }
        //console.log(this.currentForumListView);
    }

    updateForumListData(categoryId,forumData){
        this.forumListArr.map(tab=>{
            console.log(tab.page.state.categoryData.id);
           if(tab.page.state.categoryData.id === categoryId || tab.page.state.categoryData.id === '0'){
               let forumListDataSource = tab.page.state.forumListDataSource;
               forumListDataSource.unshift(forumData);
               tab.page.setState({forumListDataSource:forumListDataSource});
           }
        })
    }

    navigateToAddPage = () => {

        UserService.getUserDataFromLocalStorage()
            .then(result => {
                if (result !== null) {
                    this.props.navigation.navigate('ForumAddPage', {
                        categoriesData: this.state.categoriesData,
                        forumListPage: this
                    });
                } else {
                    Alert.alert("提示", "请先登录");
                }
            })
            .catch(error => {
                Alert.alert("提示", error);
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
    addButton: {
        paddingHorizontal: 18,
        paddingVertical:11,
    },
    navigationButton: {
        tintColor: "#fff",
        width: 20,
        height: 20,
    }
});
