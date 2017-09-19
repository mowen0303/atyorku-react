import React, {Component} from 'react';
import {View, StyleSheet,Button} from 'react-native';
import NavigationBar from '../../commonComponent/navigationBar';
import ForumService from '../../service/forum.service';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import ForumListView from './component/forum-list-view';
import ForumDetailPage from './forum-detail.page'
import {StackNavigator} from "react-navigation";

const renderTabBar = props => (
    <DefaultTabBar {...props} style={{borderBottomWidth: 1, borderBottomColor: '#f4f4f4', height: 44}}/>);

export default class ForumListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesData: [],
            loadingMore: false
        }
    }

    static navigationOptions = {
        header:null
    };

    render() {
        return (

            <View style={styles.container}>
                <Button
                    onPress={() => this.props.navigation.navigate('Profile', {name: 'Lucy'})}
                    title="Go to Lucy's profile"
                />
                <NavigationBar style={styles.navigationBar}
                               title={'同学圈'}
                               titleStyle={'light'}
                               navigationBarHide={true}
                />

                <ScrollableTabView renderTabBar={renderTabBar}
                                   tabBarBackgroundColor={'#fff'}
                                   tabBarActiveTextColor={'#f14b61'}
                                   tabBarInactiveTextColor={'#8a8a8a'}
                                   tabBarTextStyle={{marginTop: 20, fontSize: 15}}
                                   tabBarUnderlineStyle={{backgroundColor: '#f14b61', height: 2, borderRadius: 1}}>
                    <ForumListView categoryId="0" tabLabel="全部">内容1</ForumListView>
                    <ForumListView categoryId="1" tabLabel="杂谈">杂谈</ForumListView>
                    <ForumListView categoryId="5" tabLabel="约">约</ForumListView>
                    <ForumListView categoryId="4" tabLabel="讨论">讨论</ForumListView>
                    <ForumListView categoryId="3" tabLabel="交易">交易</ForumListView>
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

const ModalStack = StackNavigator({
    Profile: {screen: ForumDetailPage},
});
