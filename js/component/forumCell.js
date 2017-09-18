import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import CommonService from '../service/common.service';
import ImageLoad from 'react-native-image-placeholder';

export default class ForumCell extends Component {
    render() {
        return (
            <TouchableOpacity>
                <View style={styles.cellBox}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{marginRight: 10}}>
                            <ImageLoad
                                style={{height: 40, width: 40, borderRadius: 20, overflow: 'hidden'}}
                                source={{url: CommonService.host + this.props.data.img}}
                                placeholderSource={require('../../res/images/placeHolder.png')}
                                isShowActivity={false}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={[styles.font, {fontSize: 15, color: '#444'}]}>
                                {this.props.data.alias}
                                {this.elementForGenderIcon()}
                                {this.elementForAdminIcon()}
                            </Text>
                            <Text style={[styles.font, {color: '#999', fontSize: 13}]}>
                                {CommonService.pipeOfUserInfo(this.props.data.major, '专业')}
                                - {CommonService.pipeOfUserInfo(this.props.data.enroll_year, '年级')}
                                - {CommonService.pipeOfUserInfo(this.props.data.degree, '学历')}
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.font, {fontSize: 18, marginTop: 10, marginBottom: 10, color: '#444'}]}
                          numberOfLines={3} accessible={true}>{this.props.data.content}</Text>
                    {this.elementForImg1()}
                </View>
            </TouchableOpacity>
        )
    }

    elementForGenderIcon() {
        if (this.props.data.gender == '0') {
            return <Image style={styles.userIcon}
                          source={require("../../res/icon/girl.png")}/>
        } else if (this.props.data.gender == '1') {
            return <Image style={styles.userIcon}
                          source={require("../../res/icon/boy.png")}/>
        } else {
            return <Image style={styles.userIcon}
                          source={require("../../res/icon/neutral.png")}/>
        }

    }

    elementForAdminIcon() {
        if (this.props.data.is_admin == '1') {
            return <Image style={[styles.userIcon, {marginLeft: 8}]}
                          source={require("../../res/icon/admin.png")}/>
        }
    }

    elementForImg1() {
        if (this.props.data.img1 !== "") {
            return (
                <View>
                    <ImageLoad style={{height: 90, width: 90}}
                               placeholderSource={require('../../res/images/placeHolder.png')}
                               loadingStyle={{size: 'small', color: '#ccc'}}
                               source={{url: CommonService.host + this.props.data.img1}}/>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    font: {
        fontFamily: (Platform.OS === 'ios') ? 'PingFangSC-Light' : 'normal'
    },
    cellBox: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 1.5},
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2 // android
    },
    userIcon: {
        height: 17,
        width: 17,
        margin: 3,
        marginLeft: 6
    }
});