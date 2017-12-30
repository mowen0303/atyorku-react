import React, {Component, PropTypes} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import BookService from '../service/book.service';
import BookCell from './book-cell.component'
import {LoadMore} from '../../../commonComponent/loading.component';


export default class BookListView extends Component {

    page = 1;

    constructor(props) {
        super(props);
        this.state = {
            result: '',
            data: [],
            isRefreshing: false,
            isLoadingMore: false
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => {this.refreshPage()}}
                        />
                    }
                    onEndReached={() => this.loadNextPage()}
                    onEndReachedThreshold={-30000}
                    renderFooter={() => <LoadMore isLoading={this.state.isLoadingMore}/>}
                />
            </View>
        )
    }

    componentDidMount() {
        this.refreshPage();
    }

    renderItem = (data) =>{
        return <BookCell {...this.props} data={data.item} />
    }

    async refreshPage() {
        this.page = 1;
        await this.setState({isRefreshing: true});

        BookService.getBooks(this.page)
            .then(async (json) => {
                if(json.code===1){
                    this.page++;
                    await this.setState({
                        data: json.result,
                        isRefreshing: false
                    });
                }
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

        BookService.getBooks(this.page)
            .then(async (json) => {
                if (json.code === 1) {
                    this.page++;
                    await this.setState({
                        data: this.state.data.concat(json.result),
                        isLoadingMore: false
                    });
                }
            })
            .catch(error => {
                alert(error)
            })
    }
}
