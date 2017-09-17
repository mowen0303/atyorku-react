import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import NavigationBar from '../../component/NavigationBar';
import ForumService from '../../service/forum.service';


export default class ForumListPage extends Component {


    render() {
        return (
            <NavigationBar
                title={'同学圈2'}
                leftButton={<TouchableOpacity><Image style={styles.navBtnImg}
                                                     source={require('./../../../res/icon/add.png')}></Image></TouchableOpacity>}
                rightButton={<View style={styles.navBtnView}>
                    <TouchableOpacity
                    onPress={()=>this.load()}><Image style={styles.navBtnImg}
                                             source={require('./../../../res/icon/add.png')}></Image></TouchableOpacity>
                </View>}
            />
        )
    }


    load(){
        ForumService.getForumCategories().then(json=>alert(json.message)).catch((error)=>alert(error));
    }



}

const styles = StyleSheet.create({
    navBtnView: {
        flexDirection: 'row'
    },
    navBtnImg: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginRight: 5
    }
});