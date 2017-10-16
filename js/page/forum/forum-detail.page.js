import React, {Component} from 'react';
import {View, StyleSheet, ListView, TextInput,TouchableOpacity, Text, Keyboard} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import {LoadMore} from '../../commonComponent/loadingView';


export default class ForumDetailPage extends Component {

    page = 1
    data = []

    constructor(props) {
        super(props);
        this.state = {
            listViewDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
            onEndReachedThreshold: 10,
            commentContent:null,
            keyboardHeight: 0,
            commentBoxHeight:0
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
                <View style={[styles.commentBox,{height:this.state.commentBoxHeight,marginBottom:this.state.keyboardHeight}]}>
                    <TextInput
                        ref="textInputRefer"
                        style={styles.commentInput}
                        selectionColor={"#484848"}
                        multiline={true}
                        underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                        onContentSizeChange={(event) => {this.setState({commentBoxHeight:Math.min(80,event.nativeEvent.contentSize.height+20)})}}
                        />
                    <TouchableOpacity style={styles.commentButton}><Text style={styles.commentButtonText}>发送</Text></TouchableOpacity>
                </View>
            </View>
        )
    }

    // onChange=(event)=> {
    //
    //     console.log(event.nativeEvent.contentSize.height);
    //     // this.setState({
    //     //     text: event.nativeEvent.text,
    //     //     height: event.nativeEvent.contentSize.height,
    //     // });
    // }

    onContentSizeChange = (event)=>{
        console.log(event);
    }

    componentDidMount() {
        this.getComments();
        ForumService.addOnceView(this.props.navigation.state.params.data.id);
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

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardWillHideListener.remove();
    }

    keyboardDidShow = (e) => {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })

    }

    keyboardWillHide= ()=> {
        this.setState({
            keyboardHeight: 0
        })
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
    },
    commentBox:{
        height:40,
        backgroundColor:"#f4f4f4",
        borderTopWidth:1,
        borderTopColor:"#e8e8e8",
        flexDirection:"row"
    },
    commentInput:{
        fontSize:14,
        backgroundColor:"#fff",
        color:"#484848",
        borderRadius:4,
        padding:10,
        flex:1,
        marginRight:10,
        position:"absolute",
        left:10,
        top:5,
        bottom:5,
        right:60
    },
    commentButton:{
        backgroundColor:"#e5e5e5",
        width:50,
        height:28,
        borderRadius:4,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
        position:"absolute",
        top:5,
        right:10
    },
    commentButtonText:{
        color:"#666"
    }
});