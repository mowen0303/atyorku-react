import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity, Text, Image} from 'react-native';
import ForumService from './service/forum.service';
import {LoadMiddle} from '../../commonComponent/loading.component';
import globalStyles from '../../style/style';
import ImagePicker from 'react-native-image-picker';
import Selector from '../../commonComponent/selector.component';


export default class ForumAddPage extends Component {

    categoriesData = [];

    constructor(props) {
        super(props);
        this.state = {
            content: null,
            image1Source: null,
            progress: "发布中 0%",
            isLoading: false,
            modalVisible: false
        }
        this.categoriesData = this.props.navigation.state.params.categoriesData.filter(category =>
            category.id !== '0'
        )
    }


    static navigationOptions = ({navigation}) => ({
        title: '编辑',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff',
        headerRight: <TouchableOpacity style={globalStyles.headerLiteralButton} onPress={() => {
            navigation.state.addForum()
        }}><Text style={globalStyles.headerLiteralButtonText}>发布</Text></TouchableOpacity>,
    });

    componentWillMount() {
        this.props.navigation.state.addForum = this.addForum;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
                    <TextInput style={styles.textInput}
                        multiline={true}
                        placeholder={"你此刻的想法..."}
                        underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                        onChangeText={(text) => this.setState({content: text})}
                    />
                    <Selector ref="category"
                              dataSource={this.categoriesData}
                              modalTitle="选择一个分类"
                              idAttributeName="id"
                              titleAttributeName="title"
                              iconAttributeName="icon"
                    />
                    <TouchableOpacity style={styles.pictureButton} onPress={() => {
                        this.pickUpPhoto()}}>
                        {this.elementImgage1(this.state.image1Source)}
                    </TouchableOpacity>
                </ScrollView>
                <LoadMiddle isLoading={this.state.isLoading} text={this.state.progress}/>
            </View>
        )
    }

    addForum = async () => {
        let categoryId = this.refs.category.state.selectedId;
        if (this.state.content === null || this.state.content === "") {
            Alert.alert('提示', '说点什么吧');
            return false;
        }
        if (categoryId === 0) {
            Alert.alert('提示', '请选择一个分类');
            return false;
        }

        if (this.state.isLoading === true) {
            return false;
        }
        await this.setState({isLoading: true});
        ForumService.addForum(categoryId, this.state.content, "10", "sell", this.state.image1Source,
            async (progress) => {
                await this.setState({progress: "发布中 " + progress});
            },
            (result) => {
                this.setState({isLoading: false});
                if (result.code === 1) {
                    console.log(result.result)
                    this.props.navigation.state.params.forumListPage.updateForumListData(categoryId,result.result);
                    this.props.navigation.goBack();
                } else {
                    Alert.alert(result.message);
                }
            },
            (error) => {
                this.setState({isLoading: false});
                console.log(error);
            }
        );
    };

    pickUpPhoto() {
        let options = {
            title: '选择图片',
            maxWidth: 1800,
            maxHeight: 1800,
            quality: 0.9,
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "打开相册",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                //success response
                this.setState({image1Source: response.uri});
            }
        });
    }

    elementImgage1(url) {
        if (url === null) {
            return <Image style={styles.selectedImg} source={require("../../../res/icon/addpicture.png")}/>;
        } else {
            return <Image style={styles.selectedImg} source={{uri: url}}/>;
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 10
    },
    textInput: {
        backgroundColor: '#fff',
        color:"#484848",
        height: 150,
        fontSize: 16,
        padding: 10,
        textAlignVertical: 'top',  //Android text align top
    },
    pictureButton: {
        width: 80,
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
    },
    selectedImg: {
        width: 80,
        height: 80,
    },

});