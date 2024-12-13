import React, {Component} from 'react';
import {View, StyleSheet, ListView, Alert, Clipboard, FlatList} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import {LoadMore, LoadMiddle} from '../../commonComponent/loading.component';
import ForumCommentReplyView from "./component/forum-comment-reply-view.component";
import UserService from "../user/service/user.service";
import ActionSheet from 'react-native-actionsheet'


export default class ForumDetailPage extends Component {

    currentPage = 1;
    userData = null;
    forumData = this.props.navigation.state.params.forumData;

    //action sheet option
    CANCEL_INDEX = 0;
    DESTRUCTIVE_INDEX = 3;
    sheetButtons1 = ['取消', '复制', '举报', '删除'];
    sheetButtons2 = ['取消', '复制', '举报'];
    title = null;
    selectedCommentData = null;


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isPublishing: false,
            sheetButtons: this.sheetButtons2,
            data: [],
        }
        console.log(this.props.navigation.state.params.forumData);
    }

    static navigationOptions = {
        title: '帖子详情',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff'
    }

    componentWillMount() {
        UserService.getUserDataFromLocalStorage().then(userData => {
            this.userData = userData;
        });
    }

    componentDidMount() {
        this.getComments();
        ForumService.addOnceView(this.forumData.id);
    }


    render() {

        return (
            <View style={styles.container}>
                <FlatList style={{flex: 1}}
                          data={this.state.data}
                          refreshing={this.state.isLoading}
                          extraData={this.state}
                          keyExtractor={(item, index) => item.id}
                          ListHeaderComponent={this.listHeaderComponent}
                          renderItem={this.renderItem}
                          ListFooterComponent={this.listFooterComponent}
                          onEndReachedThreshold={0.1}
                          onEndReached={() => this.getComments()}
                />
                <ForumCommentReplyView submit={this.submit} ref='commentView'/>
                <LoadMiddle isLoading={this.state.isPublishing} text={"发布中..."}/>
                <ActionSheet
                    ref={o => this.ForumActionSheet = o}
                    title={this.title}
                    options={this.state.sheetButtons}
                    cancelButtonIndex={this.CANCEL_INDEX}
                    destructiveButtonIndex={this.DESTRUCTIVE_INDEX}
                    onPress={(index) => {
                        this.handleClickForumMoreButton(index)
                    }}
                />
                <ActionSheet
                    ref={o => this.CommentActionSheet = o}
                    title={this.title}
                    options={this.state.sheetButtons}
                    cancelButtonIndex={this.CANCEL_INDEX}
                    destructiveButtonIndex={this.DESTRUCTIVE_INDEX}
                    onPress={(index) => {
                        this.handleClickCommentMoreButton(index)
                    }}
                />
            </View>
        )
    }

    listHeaderComponent = () => {
        return <ForumCell forumData={this.forumData} onPressMoreButton={() => {
            this.clickForumMoreButton()
        }} activeOpacity={1} isShowCompleteInfo={true}/>
    }

    renderItem = (data) => {
        return <CommentCell data={data.item} onPress={() => {
            this.clickComment(data.item)
        }} onPressMoreButton={() => {
            this.clickCommentMoreButton(data.item)
        }}/>
    }

    listFooterComponent = () => {
        return <LoadMore isLoading={this.state.isLoading}/>
    }


    submit = () => {
        if (this.userData === null) {
            Alert.alert("提示", "请先登录账号，再进行回复")
            return false;
        }
        this.setState({isPublishing: true});
        let receiverID = this.refs.commentView.state.receiverID === null ? this.forumData.user_id : this.refs.commentView.state.receiverID;
        ForumService.addComment(this.refs.commentView.state.value, this.forumData.id, receiverID)
            .then(async json => {
                this.setState({isPublishing: false});
                if (json.code === 1) {
                    let data = this.state.data;
                    data.push(json.result);
                    await this.setState({data: data});
                    this.refs.commentView.setState({value: ""});
                } else {
                    Alert.alert("提示", json.message);
                }

            })
            .catch(error => {
                this.setState({isPublishing: false});
                Alert.alert("提示", "网络环境异常");
            });
    }

    async clickForumMoreButton() {
        if (this.userData !== null && (this.forumData.user_id === this.userData.id || this.userData.is_admin === "1")) {
            await this.setState({sheetButtons: this.sheetButtons1});
        } else {
            await this.setState({sheetButtons: this.sheetButtons2});
        }
        this.ForumActionSheet.show();
    }

    handleClickForumMoreButton(index) {
        if (index === 1) {
            //copy
            Clipboard.setString(this.forumData.content);
        } else if (index === 2) {
            //report
            ForumService.reportForum(this.forumData.id)
                .then(json => {
                    Alert.alert("提示", json.message);
                })
                .catch(error => {
                    Alert.alert("提示", "网络环境异常");
                })
        } else if (index === 3) {
            //delete a forum
            ForumService.deleteForum(this.forumData.id).then(async json => {
                if (json.code === 1) {
                    this.props.navigation.state.params.parentPage.deleteForum(this.forumData.id);
                    this.props.navigation.goBack();
                } else {
                    Alert.alert(json.message);
                }
            })
        }
    }

    async clickComment(commontData) {
        this.selectedCommentData = commontData;
        if (this.userData === null) {
            Alert.alert("提示", "请先登录账号，再进行回复")
            return false;
        }
        if (this.userData.id !== this.selectedCommentData.user_id) {
            this.refs.commentView.setState({
                placeholder: `@${this.selectedCommentData.alias}`,
                receiverID: this.selectedCommentData.user_id
            });
            this.refs.commentView.getFocus();
        }
    }

    async clickCommentMoreButton(commentData) {
        this.selectedCommentData = commentData;
        if (this.userData !== null && (commentData.user_id === this.userData.id || this.userData.is_admin === "1")) {
            await this.setState({sheetButtons: this.sheetButtons1});
        } else {
            await this.setState({sheetButtons: this.sheetButtons2});
        }
        this.CommentActionSheet.show();
    }

    handleClickCommentMoreButton(index) {
        if (index === 1) {
            //copy
            Clipboard.setString(this.selectedCommentData.content_comment);
        } else if (index === 2) {
            //report
            ForumService.reportComment(this.selectedCommentData.id)
                .then(json => {
                    Alert.alert("提示", json.message);
                })
                .catch(error => {
                    Alert.alert("提示", "网络环境异常");
                })
        } else if (index === 3) {
            //delete
            ForumService.deleteComment(this.selectedCommentData.id).then(async json => {
                if (json.code === 1) {
                    let deletedIndex = this.state.data.indexOf(this.selectedCommentData);
                    let newData = this.state.data;
                    newData.splice(deletedIndex, 1);
                    await this.setState({data: newData});
                } else {
                    Alert.alert(json.message);
                }
            })
        }
    }

    async getComments() {
        //如果正在加载，或者当前页等于false
        if(this.state.isLoading || !this.currentPage) return false;
        await this.setState({isLoading: true});
        ForumService.getComments(this.forumData.id, this.currentPage)
            .then(async (json) => {
                if (json.code === 1) {
                    this.currentPage++;
                    this.totalPage = json.thirdResult.totalPage;
                    await this.setState({data: this.state.data.concat(json.secondResult)});
                }else{
                    this.currentPage = false;
                }
                await this.setState({isLoading: false})
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