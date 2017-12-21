import React, {Component, PropTypes} from 'react';
import {View, ListView, FlatList, RefreshControl, Alert} from 'react-native';
import ForumService from '../service/forum.service';
import ForumCell from './forum-cell.component'
import {LoadMore} from '../../../commonComponent/loading.component';


export default class ForumListView extends Component {

    page = 1;
    data = [];

    constructor(props) {
        super(props);
        this.state = {
            result: '',
            dataSource: [],
            isRefreshing: false,
            isLoadingMore: false,
        }
    }

    static propTypes = {
        categoryId: PropTypes.string,
        rootPage:PropTypes.object
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.dataSource}
                    extraData={this.state}
                    keyExtractor={(item,index)=>item.id}
                    renderItem={(data) => <ForumCell rootPage={this.props.rootPage} {...this.props} data={data.item} numberOfLines={3}/>}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => {
                                this.refreshPage()
                            }}
                        />
                    }
                    onEndReached={() => this.loadNextPage()}
                    onEndReachedThreshold={30}
                    ListFooterComponent={() => <LoadMore isLoading={this.state.isLoadingMore}/>}
                />
            </View>
        )
    }

    componentDidMount() {
        this.refreshPage();
    }

    listHeaderComponent(){
        return (
          <view>
              <text>good</text>
          </view>
        );
    }


    async refreshPage() {
        this.page = 1;
        await this.setState({isRefreshing: true});

        ForumService.getForums(this.props.categoryId, this.page)
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
        if (this.state.isRefreshing || this.state.isLoading) {
            return false;
        }

        await this.setState({isLoadingMore: true})

        ForumService.getForums(this.props.categoryId, this.page)
            .then(async (json) => {
                if (json.code === 1) {
                    this.page++;
                    for (let i = 0; i < json.result.length; i++) {
                        this.data.push(json.result[i]);
                    }
                    await this.setState({
                        dataSource: this.data,
                        isLoadingMore: false
                    });
                }
            })
            .catch(error => {
                alert(error)
            })

    }
}