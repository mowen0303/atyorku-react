import React, {Component, PropTypes} from 'react';
import {View, ListView, RefreshControl} from 'react-native';
import ForumService from '../service/forum.service';
import ForumCell from './forumCell'
import LoadMoreBar from './loadMoreBar';


export default class ForumListView extends Component {

    page = 1;
    metadata = [];

    static propTypes = {
        categoryId: PropTypes.string,
        //title: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            result: '',
            page: 1,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
            isLoadingMore: false
        }
    }

    componentDidMount() {
        this.loadDataOfForumsFirstPage();
    }

    loadDataOfForumsFirstPage() {
        this.page = 1;
        this.setState({
            isLoading: true,
        });
        ForumService.getForums(this.props.categoryId, this.page)
            .then((json) => {
                this.metadata = json.result;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(json.result),
                    isLoading: false
                });
            })
            .catch(error => {
                alert(error)
            })

    }

    loadDataOfForumsNextPage() {
        if (this.state.isLoading) {
            return false;
        }
        if (this.state.isLoadingMore) {
            return false;
        }
        this.setState({
            page: this.page + 1,
            isLoadingMore: true
        })


        ForumService.getForums(this.props.categoryId, this.page)
            .then((json) => {
                if (json.code == 1) {
                    for (let i = 0; i < json.result.length; i++) {
                        this.metadata.push(json.result[i]);
                    }
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.metadata),
                        isLoadingMore: false
                    });
                }

            })
            .catch(error => {
                alert(error)
            })

    }


    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <ForumCell data={data}/>}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => {this.loadDataOfForumsFirstPage()}}
                        />
                    }
                    onEndReached={() => this.loadDataOfForumsNextPage()}
                    onEndReachedThreshold={30}
                    renderFooter={() => <LoadMoreBar isLoadingMore={this.state.isLoadingMore}/>}
                />
            </View>
        )
    }
}