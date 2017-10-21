import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, Clipboard} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import CommonService from '../../../service/common.service';
import globalStyles from '../../../style/style';

export default class CommentCell extends Component {

    static PropTypes={
        onPress:PropTypes.func,
        onPressMoreButton: PropTypes.func,
        data:PropTypes.object
    }

    render() {
        return (
                <TouchableOpacity activeOpacity={0.8} style={styles.cellBox} onPress={this.props.onPress}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{marginRight: 10}}>
                            <ImageLoad
                                style={{height: 30, width: 30, borderRadius: 15, overflow: 'hidden', marginTop:7}}
                                source={{uri: CommonService.host + this.props.data.img}}
                                placeholderSource={require('../../../../res/images/transparence.png')}
                                isShowActivity={false}
                                borderRadius={15}
                            />
                        </TouchableOpacity>
                        <View style={{flex:1}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[globalStyles.font, {fontSize: 15, color: '#333', maxWidth: 200}]} numberOfLines={1}>
                                    {this.props.data.alias}
                                </Text>
                                {this.elementForAdminIcon()}
                                <View style={{flexDirection:'row',justifyContent:'flex-end',position:'absolute',right:0,width:120}}>
                                    <Text style={[styles.remarkText, globalStyles.font]}>{this.props.data.time}</Text>
                                    <TouchableOpacity onPress={this.props.onPressMoreButton}><Image source={require('../../../../res/icon/more.png')} style={[styles.remarkIcon,{marginRight:0}]}/></TouchableOpacity>
                                </View>
                            </View>
                            <Text style={[globalStyles.font, {color: '#999', fontSize: 12}]}>
                                {CommonService.pipeOfUserInfo(this.props.data.major, '专业')}
                                - {CommonService.pipeOfUserInfo(this.props.data.enroll_year, '年级')}
                                - {CommonService.pipeOfUserInfo(this.props.data.degree, '学历')}
                            </Text>
                        </View>
                    </View>
                    <Text style={[globalStyles.font, styles.textStyle, {fontSize: 16, marginTop: 5, marginLeft:40, marginBottom: 5, color: '#444'}]}
                          selectable={true} numberOfLines={this.props.numberOfLines}>{this.props.data.content_comment}</Text>
                </TouchableOpacity>
        )
    }

    elementForAdminIcon() {
        if (this.props.data.is_admin == '1') {
            return <Image style={[styles.userIcon, {marginLeft: 8}]}
                          source={require("../../../../res/icon/admin.png")}/>
        }
    }

}


const styles = StyleSheet.create({
    cellBox: {
        padding: 10,
        marginBottom: 1,
        backgroundColor: '#fcfcfc'
    },
    userIcon: {
        height: 15,
        width: 15,
        margin: 3,
        marginLeft: 6
    },
    remarkText:{
        color:'#888',
        fontSize:12
    },
    remarkIcon:{
        width:16,
        height:16,
        marginLeft:10,
        marginRight:10,
        marginTop:1,
        tintColor:'#888'
    }
});