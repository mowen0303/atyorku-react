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
            isRefreshing: false,
            isLoadingMore: false,
            onEndReachedThreshold:0.1,
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
                    onEndReachedThreshold={this.state.onEndReachedThreshold}
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
        return (
          <View style={{backgroundColor:"#fff",marginBottom:10,flexDirection:"row",padding:10}}>
              <ImageLoad
                  style={{height: 44, width: 44, borderRadius:22, overflow:'hidden',marginRight:14}}
                  source={{uri: CommonService.host + this.props.categoryData.icon}}
                  placeholderSource={require('../../../../res/images/transparence.png')}
                  isShowActivity={false}
                  borderRadius = {20}
              />
              <View style={{flex:1}}>
                  <Text style={{color:"#484848",fontSize:15,paddingBottom:4,marginTop:3}}>{this.props.categoryData.title}</Text>
                  <Text style={{color:"#686868"}}>帖子：{this.props.categoryData.count_all} | 主题：{this.props.categoryData.count_all}</Text>
              </View>
          </View>
        );
    };


    async refreshPage() {
        this.page = 1;
        await this.setState({isRefreshing: true});

        ForumService.getForums(this.props.categoryData.id, this.page)
            .then(async (json) => {
                if(json.code===1){
                    this.page++;
                    this.data = json.result;
                    await this.setState({
                        dataSource: json.result,
                    });
                    console.log(this.state.dataSource);
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

        if (this.state.isRefreshing || this.state.isLoadingMore) {
            return false;
        }
        await this.setState({isLoadingMore: true});

        ForumService.getForums(this.props.categoryData.id, this.page)
            .then(async (json) => {
                if (json.code === 1) {
                    this.page++;
                    await this.setState({dataSource:this.state.dataSource.concat(json.result)})
                } else {
                    await this.setState({onEndReachedThreshold: -10000})
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