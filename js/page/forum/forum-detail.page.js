import React, {Component} from 'react';
import {View, StyleSheet, ListView, StatusBar, Text} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import LoadMoreBar from '../../commonComponent/loadMoreBar';


export default class ForumDetailPage extends Component {

    page = 1
    data = []

    constructor(props) {
        super(props);
        this.state = {
            listViewDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoadingMore: false,
            onEndReachedThreshold: 10
        }
    }

    static navigationOptions = {
        title: '帖子详情',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff'
    }

    render() {

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.listViewDataSource}
                    renderRow={(data) => <CommentCell data={data}/>}
                    renderHeader={() => <ForumCell data={this.props.navigation.state.params.data} activeOpacity={1}
                                                   isImageFullSize={true} isPressAble={false}/>}
                    renderFooter={() => <LoadMoreBar isLoadingMore={this.state.isLoadingMore}/>}
                    onEndReached={() => this.getComments()}
                    onEndReachedThreshold={this.state.onEndReachedThreshold}
                />
            </View>
        )
    }

    componentDidMount() {
        this.getComments();
        ForumService.addOnceView(this.props.navigation.state.params.data.id);
    }

    async getComments() {

        if (this.state.isLoadingMore === true) {
            return false;
        }

        await this.setState({isLoadingMore: true});

        ForumService.getComments(this.props.navigation.state.params.data.id, this.page)
            .then(async (json) => {

                if (json.code === 1) {
                    this.page++;
                    for (let i = 0; i < json.secondResult.length; i++) {
                        this.data.push(json.secondResult[i]);
                    }
                    await this.setState({listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.data)});
                    if (this.page > json.thirdResult.totalPage) {
                        await this.setState({onEndReachedThreshold: -10000})
                    }
                } else {
                    await this.setState({onEndReachedThreshold: -10000})
                }
                await this.setState({isLoadingMore: false})
            })
            .catch((error) => alert(error));
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
    }
});