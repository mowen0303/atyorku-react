import React, {Component, PropTypes} from 'react';
import {View, Text, FlatList, RefreshControl, Alert} from 'react-native';
import ForumService from '../service/forum.service';
import ForumCell from './forum-cell.component'
import {LoadMore} from '../../../commonComponent/loading.component';
import ImageLoad from 'react-native-image-placeholder';
import CommonService from "../../../service/common.service";


export default class ForumListView extends Component {

    page = 1;

    constructor(props) {
        super(props);
        this.state = {
            forumListDataSource: [],
            categoryData: this.props.categoryData,
            isRefreshing: false,
            isLoadingMore: false,
        }
    }

    static propTypes = {
        categoryData: PropTypes.object
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.forumListDataSource}
                    //extraData={this.state}
                    keyExtractor={(item, index) => item.id}
                    ListHeaderComponent={this.listHeaderComponent}
                    renderItem={({item}) => <ForumCell {...this.props}
                                                       onPressForum={() => {this.navigateToForumDetailPage(item)}}
                                                       forumData={item} numberOfLines={3}/>}
                    ListFooterComponent={() => <LoadMore isLoading={this.state.isLoadingMore}/>}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => {
                                this.refreshPage()
                            }}
                        />
                    }
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.loadNextPage()}
                />
            </View>
        )
    }

    componentDidMount() {
        this.refreshPage();
    }

    navigateToForumDetailPage = (forumData) => {
        this.props.navigation.navigate('ForumDetailPage', {forumData: forumData, parentPage: this});
    }

    navigateToForumAddPage = ()=>{
        UserService.getUserDataFromLocalStorage()
            .then(result => {
                if (result !== null) {
                    this.props.navigation.navigate('ForumAddPage', {
                        categoriesData: this.props.categoryData,
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

    //list header
    listHeaderComponent = () => {
        return (
            <View style={{backgroundColor: "#fff", marginBottom: 10, flexDirection: "row", padding: 14}}>
                <ImageLoad
                    style={{height: 44, width: 44, borderRadius: 22, overflow: 'hidden', marginRight: 14}}
                    source={{uri: CommonService.host + this.state.categoryData.icon}}
                    placeholderSource={require('../../../../res/images/transparence.png')}
                    isShowActivity={false}
                    borderRadius={20}
                />
                <View style={{flex: 1,height:39,paddingTop:2}}>
                    <Text style={{color: "#484848", flex: 1}}>
                        <Text style={{color: "#787878"}}>主题：</Text>{this.state.categoryData.count_all}
                        <Text style={{color: "#787878"}}>   帖子数：</Text>{this.state.categoryData.count_forum_and_comment}
                    </Text>
                    <Text style={{color: "#787878"}}>
                        {this.state.categoryData.description}
                    </Text>
                    <Text style={{position: "absolute", color:"#787878", right: 0, top: 2}}>
                        今日：<Text style={{color: "#D13F31",fontWeight:"bold"}}>{this.state.categoryData.count_today}</Text>
                    </Text>
                </View>
            </View>
        );
    };

    deleteForum(forumId){
        let forumList = this.state.forumListDataSource.filter(forumData=>forumData.id != forumId);
        this.setState({forumListDataSource:forumList});
    }


    refreshPage() {
        this.page = 1;
        this.setState({isRefreshing: true});
        ForumService.getCategories()
            .then((json) => {
                if (json.code === 1) {
                    let categoryDataOfCurrentPage = json.result.find(item => item.id === this.props.categoryData.id);
                    this.setState({categoryData: categoryDataOfCurrentPage});
                }

            })
        ForumService.getForums(this.state.categoryData.id, this.page)
            .then((json) => {
                if (json.code === 1) {
                    this.page++;
                    this.setState({
                        forumListDataSource: json.result,
                    });
                } else {
                    Alert.alert(json.message);
                }
                this.setState({isRefreshing: false})
            })
            .catch(error => {
                alert(error)
            })
    }

    async loadNextPage() {
        if (this.state.isRefreshing || this.state.isLoadingMore || !this.page) return false;
        await this.setState({isLoadingMore: true});
        ForumService.getForums(this.state.categoryData.id, this.page)
            .then((json) => {
                if (json.code === 1) {
                    this.page++;
                    this.setState({forumListDataSource: this.state.forumListDataSource.concat(json.result)})
                } else {
                    this.page = false;
                }
                this.setState({isLoadingMore: false})
            })
            .catch(error => {
                alert(error)
            })
    }
}