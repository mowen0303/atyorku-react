import React, {Component} from 'react';
import {View, StyleSheet, ListView, Alert} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import {LoadMore, LoadMiddle} from '../../commonComponent/loadingView';
import CommentView from "../../commonComponent/commentView";
import UserService from "../user/service/user.service";

export default class ForumDetailPage extends Component {

    page = 1
    data = []
    userData = null;

    constructor(props) {
        super(props);
        this.state = {
            listViewDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
            onEndReachedThreshold: 10,
            isPublishing:false,
        }
    }

    static navigationOptions = {
        title: '帖子详情',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff'
    }

    render() {

        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.listViewDataSource}
                        renderRow={(data) => <CommentCell data={data}/>}
                        renderHeader={() => <ForumCell data={this.props.navigation.state.params.data} activeOpacity={1}
                                                       isImageFullSize={true} isPressAble={false}/>}
                        renderFooter={() => <LoadMore isLoading={this.state.isLoading}/>}
                        onEndReached={() => this.getComments()}
                        onEndReachedThreshold={this.state.onEndReachedThreshold}
                    />
                </View>
                <CommentView submit={this.submit} ref='commentView'/>
                <LoadMiddle isLoading={this.state.isPublishing} text={"发布中..."}/>
            </View>
        )
    }

    componentWillMount(){
        UserService.getUserDataFromLocalStorage().then(userData => {
            this.userData = userData;
        });
    }

    componentDidMount() {
        this.getComments();
        ForumService.addOnceView(this.props.navigation.state.params.data.id);
    }

    submit = ()=>{
        console.log(this.refs.commentView.state.commentContent);
        //  console.log(this.props.navigation.state.params.data);
        // console.log(this.userData);
        ForumService.addComment(this.refs.commentView.state.commentContent,this.props.navigation.state.params.data.id,this.props.navigation.state.params.data.user_id,this.userData.id)
            .then(json=>{
                console.log(json);
                if(json.code===1){
                    this.data.push(json.result);
                    this.setState({listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.data)})
                    this.refs.commentView.setState({commentContent:""});
                }else{
                    Alert.alert("提示",json.message);
                }

            })
            .catch(error=>{
                console.log(error);
                Alert.alert("提示","网络环境异常");
            });
    }




    async getComments() {
        if (this.state.isLoading === true) {return false;}
        await this.setState({isLoading: true});
        ForumService.getComments(this.props.navigation.state.params.data.id, this.page)
            .then(async (json) => {
                if (json.code === 1) {
                    this.page++;
                    for (let i = 0; i < json.secondResult.length; i++) {
                        this.data.push(json.secondResult[i]);
                    }
                    console.log(json.secondResult[0]);
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