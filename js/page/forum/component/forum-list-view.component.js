import React, {Component, PropTypes} from 'react';
import {View, ListView, RefreshControl} from 'react-native';
import ForumService from '../service/forum.service';
import ForumCell from './forum-cell.component'
import LoadMoreBar from '../../../commonComponent/loadingMore';


export default class ForumListView extends Component {

    page = 1;
    data = [];

    constructor(props) {
        super(props);
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isRefreshing: false,
            isLoadingMore: false
        }
    }

    static propTypes = {
        categoryId: PropTypes.string,
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <ForumCell  {...this.props} data={data} numberOfLines={3}/>}
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
                    renderFooter={() => <LoadMoreBar isLoadingMore={this.state.isLoadingMore}/>}
                />
            </View>
        )
    }

    componentDidMount() {
        this.refreshPage();
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
                        dataSource: this.state.dataSource.cloneWithRows(json.result),
                        isRefreshing: false
                    });
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    async loadNextPage() {
        if (this.state.isRefreshing || this.state.isLoadingMore) {
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
                        dataSource: this.state.dataSource.cloneWithRows(this.data),
                        isLoadingMore: false
                    });
                }
            })
            .catch(error => {
                alert(error)
            })

    }
}