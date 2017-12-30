import React, {Component} from 'react'
import {Alert, ActionSheetIOS, StyleSheet, View, Text, ScrollView, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import {LoadMiddle} from '../../commonComponent/loading.component';
import ImagePicker from 'react-native-image-crop-picker';
import BookService from './service/book.service';
import UserService from "../user/service/user.service";
import CourseCodeService from '../../service/courseCode.service';
var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class BookAddPage extends Component {

    categories={};
    courseCodeParents={};
    courseCodeChildren={};

    // courseCode表格JSX
    courseCodeTemplate(locals:Object) {
        return (
            <View style={formTemplateStyles.rowContainer}>
                <View style={[formTemplateStyles.childField, formTemplateStyles.margin]}>
                    {locals.inputs.courseCodeParent}
                </View>
                <View style={[formTemplateStyles.childField]}>
                    {locals.inputs.courseCodeChild}
                </View>
            </View>
        );
    };

    //获取Form结构
    getTypes() {
        return t.struct({
            name: t.String,
            category: t.enums(this.categories),
            courseCode: t.struct({
                courseCodeParent: t.enums(this.courseCodeParents),
                courseCodeChild: t.enums(this.courseCodeChildren),
            }),
            price: t.Number,
            description: t.maybe(t.String),
        });
    }

    options = {
        fields: {
            name: {
                auto:'placeholder',
                placeholder: '标题',
                error: '请输入标题',
            },
            category: {
                auto: 'none',
                nullOption: {value: '', text: '选择二手书类别'},
                error: '请选择一个二手书类别',
            },
            courseCode: {
                auto: 'none',
                fields: {
                    courseCodeParent: {
                        auto: 'none',
                        nullOption: {value: '', text: '选择科目类别'},
                        error: '请选择一个科目类别',
                    },
                    courseCodeChild: {
                        auto: 'none',
                        nullOption: {value: '', text: '选择科目子类别'},
                        hidden: true,
                        error: '请选择一个科目子类别',
                    },
                },
                template: this.courseCodeTemplate,
            },
            price: {
                auto: 'placeholder',
                placeholder: '价钱',
                error: '请输入价钱',
            },
            description: {
                auto: 'placeholder',
                placeholder: '二手书描述 (可选)',
                multiline: true,
                stylesheet: {
                    ...Form.stylesheet,
                    textbox: {
                        ...Form.stylesheet.textbox,
                        normal: {
                            ...Form.stylesheet.textbox.normal,
                            height: 100,
                        }
                    }
                }
            }
        }
    }

    async fetchBookCategories() {
        BookService.getBookCategories()
            .then(async (json) => {
                if(json.code===1){
                    this.categories = {};
                    json.result.forEach(obj=>{
                        this.categories[obj.id] = obj.name;
                    });
                    await this.setState({
                        type: this.getTypes(),
                    });
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    async fetchCourseCodeParents() {
        CourseCodeService.getCourseCodeParents()
            .then(async (json) => {
                if (json.code===1) {
                    this.courseCodeParents = {};
                    json.result.forEach(obj=>{
                        this.courseCodeParents[obj.id] = obj.title;
                    });
                    await this.setState({
                        type: this.getTypes(),
                    });
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    async fetchCourseCodeChildrenByParentId(id) {
        if (!id) {
            this.courseCodeChildren = {};
            await this.setState({
                type: this.getTypes(),
            });
        } else {
            CourseCodeService.getCourseCodeChildrenByParentId(id)
                .then(async (json) => {
                    if (json.code===1) {
                        this.courseCodeChildren = {};
                        json.result.forEach(obj=>{
                            this.courseCodeChildren[obj.id] = obj.title;
                        });
                        await this.setState({
                            type: this.getTypes(),
                        });
                    }
                })
                .catch(error => {
                    alert(error)
                })
        }

    }


    constructor(props) {
        super(props);
        this.state = {
            type: this.getTypes(),
            values: {courseCode:{},},
            options: this.options,
            images: [],
            progress:"发布中 0%",
            isLoading:false,
        };
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async onChange(values) {
        var temp = this.state.values;
        var ops = this.state.options;
        if (temp.courseCode.courseCodeParent !== values.courseCode.courseCodeParent) {
            temp.courseCode.courseCodeParent = values.courseCode.courseCodeParent;
            temp.courseCode.courseCodeChild = "";
            ops.fields.courseCode.fields.courseCodeChild.hidden = temp.courseCode.courseCodeParent == "";
            this.fetchCourseCodeChildrenByParentId(values.courseCode.courseCodeParent);
        } else {
            temp = values;
        }
        await this.setState({values: temp, options: ops});
    }

    async submitForm() {
        let value = this.refs.form.getValue();
        await UserService.getUserDataFromLocalStorage()
            .then(async result =>{
                if(result !== null) {
                    if (value) {
                        if(this.state.isLoading === true){return false;}
                        await this.setState({isLoading:true});
                        BookService.addBook(this.state.images, value,
                            async (progress)=> {
                                await this.setState({progress:"发布中 "+progress});
                            },
                            (result)=> {
                                this.setState({isLoading:false});
                                if(result.code === 1){
                                    this.props.navigation.state.params.bookPage.setState({tabViewPage:0});
                                    this.props.navigation.state.params.bookPage.refs.bookListView.refreshPage();
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
                    }
                }else {
                    Alert.alert("提示","请先登录");
                }
            })
            .catch(error=>{
                Alert.alert("提示",error);
            });
    }

    pickUpPhoto() {
        ActionSheetIOS.showActionSheetWithOptions({
            title: "选择图片",
            options: ["拍照","打开相册","取消"],
            cancelButtonIndex: 2
        },(btnIndex)=>{
            if (btnIndex===0) {
                ImagePicker.openCamera({
                    width: 1800,
                    height: 1800,
                    cropping: true,
                    mediaType: 'photo',
                }).then(image => {
                    var images = this.state.images;
                    if (images.length<3) {
                        images.push(image.path);
                    } else {
                        images[2] = image.path;
                    }
                    this.setState({images:images});
                });
            } else if (btnIndex===1) {
                ImagePicker.openPicker({
                    width: 1800,
                    height: 1800,
                    cropping: true,
                    multiple: true,
                    maxFiles: 3,
                    mediaType: 'photo',
                }).then(images => {
                    this.setState({images:images.map(i=>i.path)});
                });
            }
        })
    }

    elementImage(urls){
        var images=[];
        urls.forEach((url,i)=>{
            if (url!==null) {
                images.push(<Image key={`image${i}`} style={styles.selectedImg} source={{uri:url}}/>);
            }
        });
        return (
            <View style={styles.imgPickingView}>
                {
                    this.state.images.length < 3 && (
                        <TouchableOpacity style={styles.pictureButton} onPress={()=>{this.pickUpPhoto()}}>
                            <Image style={{width:80, height:80,}} source={require("../../../res/icon/addpicture.png")}/>
                        </TouchableOpacity>
                    )
                }
                {images}
            </View>
        );
    }


    static navigationOptions = {
        statusBarStyle: 'dark-content',
        title:'添加二手书',
        headerStyle:{backgroundColor:'#0e7477'},
        headerTintColor:'#fff',
        headerBackTitle:null,
    }

    componentDidMount() {
        this.fetchBookCategories();
        this.fetchCourseCodeParents();
    }

    render(){
        return (
            <View style={{flex:1}}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Form
                        ref="form"
                        type={this.state.type}
                        value={this.state.values}
                        options={this.state.options}
                        onChange={this.onChange}
                    />
                    {this.elementImage(this.state.images)}
                    <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>发布</Text>
                    </TouchableHighlight>
                </ScrollView>
                <LoadMiddle isLoading={this.state.isLoading} text={this.state.progress}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    pictureButton:{
        width:80,
        height:80,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#e8e8e8',
        marginTop:10,
        marginRight:5,
        borderRadius: 8,
    },
    selectedImg:{
        width:80,
        height:80,
        flexDirection:'row',
        justifyContent:'center',
        marginRight:5,
        marginTop:10,
        borderRadius: 8,
    },
    imgPickingView:{
        flex: 1,
        flexDirection: 'row',
        marginBottom:20,
    }
});

const formTemplateStyles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  childField: {
    flex: 1,
  },
  margin: {
    paddingRight: 8,
  },
});
