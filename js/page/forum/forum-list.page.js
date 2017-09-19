import React, {Component} from 'react';
import {View, StyleSheet,StatusBar} from 'react-native';
import ForumService from '../../service/forum.service';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import ForumListView from './component/forum-list-view.component';

const renderTabBar = props => (
    <DefaultTabBar {...props} style={{borderBottomWidth: 1, borderBottomColor: '#f4f4f4', height: 35, borderTopWidth:0}}/>);

export default class ForumListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesData: [],
            loadingMore: false
        }
    }

    static navigationOptions = {
        title:'同学圈',
        headerStyle:{backgroundColor:'#0e7477'},
        headerTintColor:'#fff',
        statusBar:'light-content'
    }

    render() {
        return (

            <View style={styles.container}>

                <StatusBar barStyle='light-content' />
                <ScrollableTabView renderTabBar={renderTabBar}
                                   tabBarBackgroundColor={'#fff'}
                                   tabBarActiveTextColor={'#0e7477'}
                                   tabBarInactiveTextColor={'#aaa'}
                                   tabBarTextStyle={{marginTop: 10, fontSize: 15}}
                                   tabBarUnderlineStyle={{backgroundColor: '#0e7477', height: 2, borderRadius: 1}}>
                    <ForumListView {...this.props} categoryId="0" tabLabel="全部"/>
                    <ForumListView {...this.props} categoryId="1" tabLabel="杂谈"/>
                    <ForumListView {...this.props} categoryId="5" tabLabel="约"/>
                    <ForumListView {...this.props} categoryId="4" tabLabel="讨论"/>
                    <ForumListView {...this.props} categoryId="3" tabLabel="交易"/>
                </ScrollableTabView>

            </View>
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
    navigationBar: {
        backgroundColor: '#fff',
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
