import React, {Component, PropTypes} from 'react';
import {View, Text, FlatList, RefreshControl, Alert} from 'react-native';
import ForumService from '../service/forum.service';
import ForumCell from './forum-cell.component'
import {LoadMore} from '../../../commonComponent/loading.component';
import ImageLoad from 'react-native-image-placeholder';
import CommonService from "../../../service/common.service";


export default class ForumListView extends Component {

    page = 1;
    data = [];
    lastLoadTime = 0;


    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            categoryData: this.props.categoryData,
            isRefreshing: false,
            isLoadingMore: false,
        }
    }

    static propTypes = {
        categoryData:PropTypes.object,
        rootPage:PropTypes.object,
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.dataSource}
                    extraData={this.state}
                    keyExtractor={(item,index)=>item.id}
                    ListHeaderComponent={this.listHeaderComponent}
                    renderItem={({item}) => <ForumCell rootPage={this.props.rootPage} {...this.props} data={item} numberOfLines={3}/>}
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

    //list header
    listHeaderComponent = ()=>{
        console.log(CommonService.host+this.state.categoryData.icon)
        return (
          <View style={{backgroundColor:"#fff",marginBottom:10,flexDirection:"row",padding:14}}>
              <ImageLoad
                  style={{height: 44, width: 44, borderRadius:22, overflow:'hidden',marginRight:14}}
                  source={{uri: CommonService.host+this.state.categoryData.icon}}
                  placeholderSource={require('../../../../res/images/transparence.png')}
                  isShowActivity={false}
                  borderRadius = {20}
              />
              <View style={{flex:1}}>
                  <Text style={{color:"#484848",fontSize:14,flex:1}}>
                      <Text style={{color:"#787878"}}>主题：</Text>{this.state.categoryData.count_all}
                      <Text style={{color:"#787878"}}>    帖子数：</Text>{this.state.categoryData.count_forum_and_comment}
                  </Text>
                  <Text style={{color:"#787878",fontSize:13}}>
                      {this.state.categoryData.description}
                  </Text>
                  <Text style={{position:"absolute",right:0,top:2}}>
                      今日：<Text style={{color:"#f00"}}>{this.state.categoryData.count_today}</Text>
                  </Text>
              </View>
          </View>
        );
    };


    async refreshPage() {
        this.page = 1;
        await this.setState({isRefreshing: true});

        ForumService.getCategories()
            .then(async (json)=>{
                if(json.code === 1){
                    let categoryDataOfCurrentPage = json.result.filter(item=>item.id === this.props.categoryData.id);
                    this.setState({categoryData:categoryDataOfCurrentPage[0]});
                    console.log(categoryDataOfCurrentPage)

                }

            })

        ForumService.getForums(this.state.categoryData.id, this.page)
            .then(async (json) => {
                if(json.code===1){
                    this.page++;
                    this.data = json.result;
                    await this.setState({
                        dataSource: json.result,
                    });
                }else{
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
            .then(async (json) => {
                if (json.code === 1) {
                    this.page++;
                    await this.setState({dataSource:this.state.dataSource.concat(json.result)})
                } else {
                    this.page=false;
                }
                await this.setState({isLoadingMore:false})
                console.log(this.page);
                console.log(this.state.dataSource);
            })
            .catch(error => {
                alert(error)
            })
    }
}