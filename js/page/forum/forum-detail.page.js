import React, {Component} from 'react';
import {View, StyleSheet, ListView, Alert, Clipboard} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import {LoadMore, LoadMiddle} from '../../commonComponent/loadingView';
import CommentView from "../../commonComponent/commentView";
import UserService from "../user/service/user.service";
import ActionSheet from 'react-native-actionsheet'


export default class ForumDetailPage extends Component {

    page = 1;
    data = [];
    userData = null;
    forumData = this.props.navigation.state.params.data;

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
            listViewDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
            onEndReachedThreshold: 10,
            isPublishing: false,
            sheetButtons: this.sheetButtons2,
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
                <ListView style={{flex:1}}
                    dataSource={this.state.listViewDataSource}
                    renderRow={(data) => <CommentCell data={data} onPress={() => {this.clickComment(data)}} onPressMoreButton={() => {this.clickCommentMoreButton(data)}}/>}
                    renderHeader={() => <ForumCell data={this.forumData} activeOpacity={1} isImageFullSize={true} isPressAble={false}/>}
                    renderFooter={() => <LoadMore isLoading={this.state.isLoading}/>}
                    onEndReached={() => this.getComments()}
                    onEndReachedThreshold={this.state.onEndReachedThreshold}
                />
                <CommentView submit={this.submit} ref='commentView'/>
                <LoadMiddle isLoading={this.state.isPublishing} text={"发布中..."}/>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={this.title}
                    options={this.state.sheetButtons}
                    cancelButtonIndex={this.CANCEL_INDEX}
                    destructiveButtonIndex={this.DESTRUCTIVE_INDEX}
                    onPress={(index) => {
                        this.handleActionSheetPress(index)
                    }}
                />
            </View>
        )
    }

    componentWillMount() {
        UserService.getUserDataFromLocalStorage().then(userData => {
            this.userData = userData;
        });
        console.log(this.forumData);
    }

    componentDidMount() {
        this.getComments();
        ForumService.addOnceView(this.forumData.id);
    }

    submit = () => {
        //console.log(this.refs.commentView.state.placeholder);
        this.setState({isPublishing: true});
        let receiverID = this.refs.commentView.state.receiverID === null ? this.forumData.user_id : this.refs.commentView.state.receiverID;
        ForumService.addComment(this.refs.commentView.state.value, this.forumData.id, this.userData.id, receiverID)
            .then(json => {
                console.log(json);
                this.setState({isPublishing: false});
                if (json.code === 1) {
                    this.data.push(json.result);
                    this.setState({listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.data)})
                    this.refs.commentView.setState({value: ""});
                } else {
                    Alert.alert("提示", json.message);
                }

            })
            .catch(error => {
                this.setState({isPublishing: false});
                console.log(error);
                Alert.alert("提示", "网络环境异常");
            });
    }

    async clickComment(commontData) {
        this.selectedCommentData = commontData;
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
        if (commentData.user_id === this.userData.id || this.userData.is_admin === "1") {
            await this.setState({sheetButtons: this.sheetButtons1});
        } else {
            await this.setState({sheetButtons: this.sheetButtons2});
        }
        this.ActionSheet.show();
    }

    handleActionSheetPress(index) {
        if (index === 1) {
            //copy
            Clipboard.setString(this.selectedCommentData.content_comment);
        } else if (index === 2) {
            //report
        } else if (index === 3) {
            //delete
            ForumService.deleteComment(this.selectedCommentData.id).then(async json => {
                if(json.code===1){
                    let deletedIndex = this.data.indexOf(this.selectedCommentData);
                    this.data.splice(deletedIndex,1);
                    await this.setState({listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.data)})
                }
            })
        }
    }

    async getComments() {
        if (this.state.isLoading === true) {
            return false;
        }
        await this.setState({isLoading: true});
        ForumService.getComments(this.forumData.id, this.page)
            .then(async (json) => {
                if (json.code === 1) {
                    this.page++;
                    this.data = this.data.concat(json.secondResult);
                    await this.setState({listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.data)});
                    if (this.page > json.thirdResult.totalPage) {
                        await this.setState({onEndReachedThreshold: -10000})
                    }
                } else {
                    await this.setState({onEndReachedThreshold: -10000})
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