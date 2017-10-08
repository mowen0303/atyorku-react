import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import UserInterface from './interface/user.Interface';
import UserInfoView from './component/userHeaderInfoView';
import globalStyle from '../../style/style';


export default class MePage extends Component {

    userData = new UserInterface();

    constructor(props) {
        super(props);
        this.state = {
            userData: new UserInterface(),
        }
    }

    static navigationOptions = {
        //headerStyle:{backgroundColor:'#fff',shadowColor:'transparent'}
        header: null,
    }

    componentDidMount(){


    }


    render() {

        return (
            <ScrollView style={styles.container}>
                <UserInfoView userData={this.state.userData} pageObject={this} {...this.props}/>
                <View style={styles.listContainer}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.listBox} onPress={this.navigationToSettingPage}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>消息</Text>
                        <Image style={styles.icon} source={require('../../../res/icon/message.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>我的发布</Text>
                        <Image style={styles.icon} source={require('../../../res/icon/myforum.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>收藏</Text>
                        <Image style={styles.icon} source={require('../../../res/icon/collection.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>点券</Text>
                        <Image style={styles.icon} source={require('../../../res/icon/credit.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.listBox} onPress={this.navigationToSettingPage}>
                        <Text style={[globalStyle.fontLight, styles.labelText]}>个人设置</Text>
                        <Image style={styles.icon} source={require('../../../res/icon/setting.png')}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    navigationToSettingPage = ()=>{
        if(this.state.userData.id === ""){return false;}
        this.props.navigation.navigate('SettingPage',{parentPage:this, userData: this.state.userData});
    }





}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 22,
    },
    listContainer:{
        marginTop:40
    },
    labelBox: {
        flexDirection: 'row',
    },
    labelIcon: {
        width: 20,
        height: 20,
        tintColor: '#484848'
    },
    labelText: {
        marginTop: 2,
        marginLeft: 8,
        color: '#484848',
        fontSize:16,
    },
    listBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:66,
        borderBottomWidth:1,
        borderColor:'#ebebeb'
    },
    icon:{
        width:22,
        height:22,
        tintColor:"#484848"
    }

})
