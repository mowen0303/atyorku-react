import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput,Alert, Picker,TouchableOpacity, LayoutAnimation,Text, Image, Platform} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import LoadMoreBar, {LoadMiddle} from '../../commonComponent/loadingView';
import globalStyles from '../../style/style';
import ImagePicker from 'react-native-image-picker';


export default class ForumAddPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bottom: -250,
            categoriesData:this.props.navigation.state.params.categoriesData,
            selectedCategory:null,
            image1Source:null,
            content:null,
            progress:"发布中 0%",
            isLoading:false,
        }
    }


    static navigationOptions = ({navigation})=>({
        title: '编辑',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff',
        headerRight:<TouchableOpacity style={globalStyles.headerLiteralButton} onPress={()=>{navigation.state.addForum()}}><Text style={{color:"#fff"}}>发布</Text></TouchableOpacity>,
    });

    componentWillMount(){
        this.props.navigation.state.addForum = this.addForum;
    }

    render() {
        return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <TextInput
                    ref="textInputRefer"
                    style={styles.textInput}
                    selectionColor={"#484848"}
                    placeholder={"说点什么吧..."}
                    clearButtonMode={'while-editing'}
                    underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                    onChangeText={(text) => this.setState({content: text})}/>
                {this.elementPicker()}
                <TouchableOpacity style={styles.pictureButton} onPress={()=>{this.pickUpPhoto()}}>
                    {this.elementImgage1(this.state.image1Source)}
                </TouchableOpacity>
            </ScrollView>
            {this.elementPickerIOS()}
            <LoadMiddle isLoading={this.state.isLoading} text={this.state.progress}/>
        </View>
        )
    }

    addForum = async () => {
        if(this.state.content === null || this.state.content === ""){
            Alert.alert('提示','说点什么吧');
            return false;
        }
        if(this.state.selectedCategory === null){
            Alert.alert('提示','请选择一个分类');
            return false;
        }
        if(this.state.isLoading === true){return false;}
        await this.setState({isLoading:true});
        ForumService.addForum(this.state.selectedCategory.id, this.state.content, "10", "sell", this.state.image1Source,
            async (progress)=> {
                await this.setState({progress:"发布中 "+progress});
            },
            (result)=> {
                this.setState({isLoading:false});
                if(result.code === 1){
                    this.props.navigation.goBack();
                }else{
                    Alert.alert(result.message);
                }
            },
            (error)=> {
                this.setState({isLoading:false});
                console.log(error);
            }
        );
    };

    openPicker(){
        LayoutAnimation.easeInEaseOut();
        this.setState({bottom:0})
    }

    closePicker(){
        LayoutAnimation.easeInEaseOut();
        this.setState({bottom:-250})
    }

    elementPicker(){
        if (Platform.OS === 'ios'){
            return (
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox} onPress={()=>{this.openPicker()}}>
                    <Text>分类</Text>
                    <View style={styles.listRight}>
                        <Text>123123</Text>
                        <Image style={styles.listRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                    </View>
                </TouchableOpacity>
            )
        }else if(Platform.OS === 'android'){
            return (
                <View style={styles.pickerAndroidBox}>
                    <View style={styles.pickerAndroidTextBox}><Text>选择分类</Text></View>
                    <View style={{flex:1}}>
                        <Picker style={styles.pickerAndroid} selectedValue={this.state.selectedCategory} onValueChange={(selectedCategory) => this.setState({selectedCategory: selectedCategory})}>
                            {this.state.categoriesData.map(category=>{
                                if(category.id!=="0"){
                                    return <Picker.Item key={category.id} label={category.title} value={category} />;
                                }else{
                                    return <Picker.Item key={0} label={"请选择..."} value={null} />;
                                }
                            })}
                        </Picker>
                    </View>
                </View>
            )
        }
    }

    elementPickerIOS(){
        if (Platform.OS === 'ios'){
            return (
                <View style={{backgroundColor:'#eee',position:'absolute', left:0,right:0, bottom:this.state.bottom}}>
                    <View style={styles.doneBox}><TouchableOpacity onPress={()=>{this.closePicker()}} style={styles.doneBtn}><Text style={styles.doneText}>完成</Text></TouchableOpacity></View>
                    <Picker selectedValue={this.state.language} onValueChange={(category) => this.setState({language: category})}>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
            )
        }
    }

    pickUpPhoto(){
        let options = {
            title: '选择图片',
            maxWidth:1800,
            maxHeight:1800,
            quality:0.9,
            takePhotoButtonTitle:"拍照",
            chooseFromLibraryButtonTitle:"打开相册",
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
                this.setState({image1Source:response.uri});
            }
        });
    }

    elementImgage1(url){
        if(url===null){
            return <Image style={styles.selectedImg} source={require("../../../res/icon/add.png")}/>;
        }else{
            return <Image style={styles.selectedImg} source={{uri:url}}/>;
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding:10
    },
    textInput:{
        backgroundColor:'#fff',
        height:150,
        fontSize:16,
        padding:10,
        textAlignVertical:'top',  //Android text align top
    },
    doneBox:{
        height:40,
        justifyContent:'flex-end',
        flexDirection:'row',
        backgroundColor:'#fff',
        borderTopWidth:1,
        borderTopColor:'#e4e4e4'
    },
    doneBtn:{
        width:80,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center",
    },
    doneText:{
        color:'#0e7477'
    },
    listBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'#fff',
        marginTop:16,
        alignItems:'center',
    },
    listRight: {
        flexDirection:'row',
        alignItems:'center'
    },
    listRightIcon:{
        width:10,
        height:10
    },
    pickerAndroidBox:{
        flexDirection:'row',
        marginTop:10,
        alignItems:'center',
        backgroundColor:'#fff',
    },
    pickerAndroidTextBox:{
        marginRight:20,
        backgroundColor:"#fff",
        marginLeft:20
    },
    pictureButton:{
        width:80,
        height:80,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#fff',
        marginTop:10,
    },
    selectedImg:{
        width:80,
        height:80,
    }
});