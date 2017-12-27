import React, {Component, PropTypes} from 'react';
import {Image, StyleSheet,View,TouchableOpacity,Text,Modal,FlatList} from 'react-native';
import CommonService from "../service/common.service";


export default class Selector extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedId: 0,
            selectedTitle: "选择分类",
            selectedIcon: false,
            modalVisible:false,
        }
    }

    static propTypes = {
        dataSource:PropTypes.array,
        idAttributeName:PropTypes.string, //指定dataSource里的id标签名
        titleAttributeName:PropTypes.string, //指定dataSource里的title标签名
        iconAttributeName:PropTypes.string, //指定dataSource里的icon标签名,可以不填
        modalTitle:PropTypes.string,
        onPress:PropTypes.func,
        callBack:PropTypes.func,
    }


    render() {
        return(
            <View>
                <TouchableOpacity style={styles.selectButtonContainer}
                                  activeOpacity={0.7}
                                  onPress={this.pressSelectorButton}
                >
                    <View style={styles.selectButtonLeftItem}>
                        {this.renderSelectorButtonIcon(this.state.selectedIcon)}
                        <Text style={styles.selectButtonText}>{this.state.selectedTitle}</Text>
                    </View>
                    <Image style={styles.selectButtonImage} source={require("../../res/icon/rightarrow.png")}/>
                </TouchableOpacity>
                <Modal animationType={"slide"} visible={this.state.modalVisible}>
                    <View style={{flex:1}}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity
                                style={styles.headerLeftButtonContainer}
                                onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                                <Text style={styles.headerLeftButtonContainerText}>取消</Text>
                            </TouchableOpacity>
                            <Text style={styles.headerTitleText}>{this.props.modalTitle}</Text>
                        </View>
                        <FlatList style={{flex:1,height:100}}
                                  data={this.props.dataSource}
                                  keyExtractor={(item,index)=>item.id}
                                  renderItem={({item})=>this.renderListRow(item)}
                        />
                    </View>
                </Modal>
            </View>
        )
    }

    renderListRow = (item)=>{
        if(this.props.iconAttributeName){
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.listContainer}
                    onPress={()=>{this.pressListRow(item)}}
                >
                    <Image style={styles.listIcon} source={{uri: CommonService.host+item[this.props.iconAttributeName]}}/>
                    <Text style={styles.listText}>{item[this.props.titleAttributeName]}</Text>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity activeOpacity={0.7} style={styles.listContainer}>
                    <Text style={styles.listText}>{item[this.props.titleAttributeName]}</Text>
                </TouchableOpacity>
            )
        }

    }

    renderSelectorButtonIcon(icon){
        if(icon){
           return <Image style={styles.listIcon} source={{uri: CommonService.host+icon}}/>
        }
    }

    pressSelectorButton = ()=>{
        if(this.props.onPress) this.props.onPress();
        this.setModalVisible(!this.state.modalVisible);

    }

    pressListRow = (item)=>{
        this.setState({
            selectedTitle:item[this.props.titleAttributeName],
            selectedId:item[this.props.idAttributeName]
        });
        if(this.props.iconAttributeName) this.setState({selectedIcon:item[this.props.iconAttributeName]});
        if(this.props.callBack) this.props.callBack();
        this.setModalVisible(false);
    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

}

const styles = StyleSheet.create({
    selectButtonContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingRight:12,
        backgroundColor:"#fff",
        marginTop:10,
        height:50
    },
    selectButtonLeftItem:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    selectButtonImage:{
        width:14,
        height:14,
        tintColor:"#686868"
    },
    selectButtonText:{
        color:"#484848",
        marginLeft:12,
        fontSize:16
    },
    headerContainer:{
        height:60,
        flexDirection:"row",
        justifyContent:"center",
        paddingTop:20,
        backgroundColor:"#0e7477"
    },
    headerLeftButtonContainer:{
        position:"absolute",
        left:0,
        bottom:0,
        paddingHorizontal:16,
        paddingVertical:12,
    },
    headerLeftButtonContainerText:{
        color:"#fff",
        fontSize:16
    },
    headerTitleText:{
        fontSize:17,
        color:"#fff",
        paddingTop:11,
        fontWeight:"bold"
    },
    listContainer:{
        flexDirection:'row',
        //justifyContent:'space-between',
        alignItems:'center',
        minHeight:54,
        borderBottomWidth:1,
        borderColor:'#f4f4f4',
    },
    listIcon:{
        width:24,
        height:24,
        marginLeft:12
    },
    listText:{
        marginLeft:12,
        color:"#484848",
        fontSize:16
    }
});