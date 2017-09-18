import React, {Component} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, ListView, RefreshControl} from 'react-native';
import NavigationBar from '../../component/navigationBar';
import ForumService from '../../service/forum.service';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import ForumCell from '../../component/forumCell'
import LoadMoreBar from '../../component/loadMoreBar';
import ForumListView from '../../component/forumListView';

const renderTabBar = props => (<DefaultTabBar {...props} style={{borderBottomWidth: 0, height: 45}}/>);

export default class ForumListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesData: [],
            loadingMore: false
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar style={styles.navBox}
                               title={'同学圈'}
                               titleStyle={'light'}
                               navigationBarHide={true}
                               statusBar={{barStyle: 'light-content'}}
                               rightButton={
                                   <View style={styles.navBtnView}>
                                       <TouchableOpacity
                                           onPress={() => this.load()}>
                                           <Image
                                               style={styles.navBtnImg}
                                               source={require('./../../../res/icon/add.png')}/>
                                       </TouchableOpacity>
                                   </View>}
                />

                <ScrollableTabView renderTabBar={renderTabBar}
                                   tabBarBackgroundColor={'#008386'}
                                   tabBarActiveTextColor={'#fff'}
                                   tabBarInactiveTextColor={'#a8d5d6'}
                                   tabBarTextStyle={{marginTop: 20, fontSize: 15}}
                                   tabBarUnderlineStyle={{backgroundColor: '#fff', height: 2, borderRadius: 1}}>
                    <ForumListView categoryId="0" tabLabel="全部">内容1</ForumListView>
                    <ForumListView categoryId="1" tabLabel="杂谈">杂谈</ForumListView>
                    <ForumListView categoryId="5" tabLabel="约">约</ForumListView>
                    <ForumListView categoryId="4" tabLabel="讨论">讨论</ForumListView>
                    <ForumListView categoryId="3" tabLabel="交易">交易</ForumListView>
                </ScrollableTabView>

            </View>
        )
    }

    getCategories() {
        ForumService.getCategories().then(
            (json) => {

            }
        )
    }

    load() {
        ForumService.getForums().then(json => alert(json.message)).catch((error) => alert(error));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    navBox: {
        backgroundColor: '#008386',
    },
    navBtnView: {
        flexDirection: 'row'
    },
    navBtnImg: {
        width: 18,
        height: 18,
        marginLeft: 5,
        marginRight: 5,
        tintColor: '#fff'
    }
});