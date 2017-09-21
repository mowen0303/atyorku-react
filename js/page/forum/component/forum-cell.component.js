import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import CommonService from '../../../service/common.service';
import ImageLoad from 'react-native-image-placeholder';
import ForumDetailPage from "../forum-detail.page";

export default class ForumCell extends Component {

    //numberOfLines
    static propTypes = {
        numberOfLines: PropTypes.number,
        isPressAble:PropTypes.bool,
        activeOpacity:PropTypes.number,
        isImageFullSize:PropTypes.bool
    }

    static defaultProps = {
        numberOfLines: 1000,
        isPressAble:true,
        activeOpacity:0.8,
        isImageFullSize:false,
    }

    pressForum(){
        if(this.props.isPressAble === true){
            this.props.navigation.navigate('ForumDetailPage', {data: this.props.data});
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.pressForum()} activeOpacity={this.props.activeOpacity}>
                <View style={styles.cellBox}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{marginRight: 10}}>
                            <ImageLoad
                                style={{height: 40, width: 40, borderRadius:20, overflow:'hidden'}}
                                source={{uri: CommonService.host + this.props.data.img}}
                                placeholderSource={require('../../../../res/images/transparence.png')}
                                isShowActivity={false}
                                borderRadius = {20}
                            />
                        </TouchableOpacity>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.font, {fontSize: 15, color: '#333',maxWidth:200}]} numberOfLines={1}>
                                    {this.props.data.alias}
                                </Text>
                                {this.elementForAdminIcon()}
                            </View>
                            <Text style={[styles.font, {color: '#999', fontSize: 12}]}>
                                {CommonService.pipeOfUserInfo(this.props.data.major, '专业')}
                                - {CommonService.pipeOfUserInfo(this.props.data.enroll_year, '年级')}
                                - {CommonService.pipeOfUserInfo(this.props.data.degree, '学历')}
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.font, {fontSize: 17, marginTop: 15, marginBottom: 10, color: '#444'}]}
                          selectable={true} numberOfLines={this.props.numberOfLines}>{this.props.data.content}</Text>
                    {this.elementForImg1()}
                    <View style={{flexDirection:'row',height:38,borderTopWidth:1, borderTopColor:'#f8f8f8', paddingTop:8, marginTop:10}}>
                        <View style={styles.footerItem}><Image source={require('../../../../res/icon/comments.png')} style={styles.footerIcon}/><Text style={[styles.footerText,styles.font]}>{this.props.data.comment_num}</Text></View>
                        <View style={styles.footerItem}><Image source={require('../../../../res/icon/browse.png')} style={styles.footerIcon}/><Text style={[styles.footerText,styles.font]}>{this.props.data.count_view}</Text></View>
                        <View style={styles.footerItem}><Image source={require('../../../../res/icon/clock.png')} style={styles.footerIcon}/><Text style={[styles.footerText,styles.font]}>{this.props.data.time}</Text></View>
                        <View style={styles.footerItem}><Image source={require('../../../../res/icon/tag.png')} style={styles.footerIcon}/><Text style={[styles.footerText,styles.font]}>{this.props.data.classTitle}</Text></View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    elementForAdminIcon() {
        if (this.props.data.is_admin === '1') {
            return <Image style={[styles.userIcon, {marginLeft: 8}]}
                          source={require("../../../../res/icon/admin.png")}/>
        }
    }

    elementForImg1() {
        if (this.props.data.img1 !== "") {
            let width = Dimensions.get('window').width-32;
            let height = 0;
            if(this.props.isImageFullSize === true){
                height = width/(this.props.data.img1Width/this.props.data.img1Height)
            }else{
                height = width/(16/7);
            }
            return (
                <View style={{flex:1}}>
                    <ImageLoad style={{flex:1, height:height,width:width, marginBottom:15}}
                               placeholderSource={require('../../../../res/images/transparence.png')}
                               loadingStyle={{size: 'small', color: '#ccc'}}
                               source={{uri: CommonService.host + this.props.data.img1}}/>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    font: {
        fontFamily: (Platform.OS === 'ios') ? 'PingFang SC' : 'normal'
    },
    cellBox: {
        padding: 16,
        paddingBottom:0,
        marginBottom: 10,
        backgroundColor: '#fff',
        // shadowColor: 'gray',
        // shadowOffset: {width: 0, height: 1.5},
        // shadowOpacity: 0.1,
        // shadowRadius: 1,
        // elevation: 2 // android
    },
    userIcon: {
        height: 15,
        width: 15,
        margin: 3,
        marginLeft: 6
    },
    footerItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'

    },
    footerText:{
        color:'#999',
        fontSize:13,
        textAlign:'center'
    },
    footerIcon:{
        height:15,
        width:15,
        tintColor:'#888',
        marginTop:3,
        marginRight:7
    }
});