import React from 'react';
import {AppRegistry, Image, StyleSheet} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom,NavigationActions} from "react-navigation";
import ForumPage from './forum/forum-list.page'
import ForumDetailPage from './forum/forum-detail.page'
import HomePage from "./home/home.page";
import LoginPage from './login/login.page';
import MePage from "./user/me.page";


const TabsNavigator = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../../res/icon/home.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        }
    },
    Course: {
        screen: ForumPage,
        navigationOptions: {
            tabBarLabel: '课程',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../../res/icon/course.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
            tabBarOnPress: (tab, jumpToIndex) => {
                navigation.navigate('LoginPage');
            },
        },
    },
    Forum: {
        screen: ForumPage,
        navigationOptions: {
            tabBarLabel: '同学圈',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../../res/icon/forum.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        }
    },
    Me: {
        screen: MePage,
        navigationOptions: {
            tabBarLabel: '我',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../../res/icon/me.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
            tabBarOnPress:() => {alert(1111)}
        },
    },

}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#f14b61',
        style: {backgroundColor: '#fff', borderTopWidth: 0}
    }
});

//所有的页面都要在这里进行注册
const SimpleApp = StackNavigator({
    Tabs: {screen: TabsNavigator},
    ForumDetailPage: {screen: ForumDetailPage},
    LoginPage: {screen: LoginPage}
},{onNavigationStateChange:()=>{alert(1)}})

const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,
    },
});

export default () => <SimpleApp />;


// AppRegistry.registerComponent('AtYorkU', () => SimpleApp);
AppRegistry.registerComponent('AtYorkU', () => SimpleApp);