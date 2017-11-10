import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import CommonService from '../../../service/common.service';
import ImageLoad from 'react-native-image-placeholder';
import BookDetailPage from "../book-detail.page";
import globalStyles from '../../../style/style'

export default class BookCell extends Component {

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

    static cellHeight = 80

    pressBook(){
        // this.props.navigation.navigate('LoginPage')
        if(this.props.isPressAble === true){
            this.props.navigation.navigate('BookDetailPage', {data: this.props.data});
        }
        // <View style={styles.footerItem}><Image source={require('../../../../res/icon/clock.png')} style={styles.footerIcon}/><Text style={[styles.footerText,globalStyles.font]}>{this.props.data.publish_time}</Text></View>
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.pressBook()} activeOpacity={this.props.activeOpacity}>
                <View style={styles.cellBox}>
                    {this.elementForImg1()}
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={[globalStyles.font, {fontSize: 15, color: '#333', maxWidth:200, marginLeft:8, marginBottom:5}]} numberOfLines={1}>
                                {this.props.data.name}
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft:8, marginBottom: 5}}>
                                <Text style={{fontSize: 13, color: '#333'}}>卖家: </Text>
                                <TouchableOpacity style={{marginRight: 10}}>
                                    <ImageLoad
                                        style={{height: 20, width: 20, borderRadius:10, overflow:'hidden'}}
                                        source={{uri: CommonService.host + this.props.data.img}}
                                        placeholderSource={require('../../../../res/images/transparence.png')}
                                        isShowActivity={false}
                                        borderRadius = {10}
                                    />
                                </TouchableOpacity>
                                <View>
                        </View>


                                <View style={{flexDirection:'row'}}>
                                    <Text style={[globalStyles.font, {fontSize: 13, color: '#333',maxWidth:200}]} numberOfLines={1}>
                                        {this.props.data.alias}
                                    </Text>
                                    {this.elementForAdminIcon()}
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={[globalStyles.font, styles.priceText]} numberOfLines={1}>
                                ${this.props.data.price}
                            </Text>
                            <View style={styles.footerItem}><Image source={require('../../../../res/icon/tag.png')} style={styles.footerIcon}/><Text style={[styles.footerText,globalStyles.font]}>{this.props.data.book_category_name}</Text></View>
                            <View style={styles.footerItem}><Image source={require('../../../../res/icon/course.png')} style={styles.footerIcon}/><Text style={[styles.footerText,globalStyles.font]}>{this.props.data.course_code_parent_title + ' ' + this.props.data.course_code_child_title}</Text></View>
                        </View>
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
            let width = Math.min(80,Dimensions.get('window').width*0.3);
            // let height = 0;
            // if(this.props.isImageFullSize === true){
            //     height = width/(this.props.data.img_width/this.props.data.img_height)
            // }else{
            //     height = width/(16/7);
            // }
            return (
                <View>
                    <ImageLoad style={{height:'100%',width:width}}
                               placeholderSource={require('../../../../res/images/transparence.png')}
                               loadingStyle={{size: 'small', color: '#ccc'}}
                               source={{uri: CommonService.host + this.props.data.thumbnail_url}}/>
                </View>
            )
        }
    }

}


const styles = StyleSheet.create({
    cellBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        paddingBottom:8,
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 100,
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
    priceText:{
        color:'#368136',
        fontSize:15,
        fontWeight:'bold',
        marginLeft:8,
    },
    footerItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'

    },
    footerText:{
        color:'#999',
        fontSize:13,
        textAlign:'center',
        marginLeft:8
    },
    footerIcon:{
        height:15,
        width:15,
        tintColor:'#888',
        marginTop:3,
        marginRight:7
    }
});
