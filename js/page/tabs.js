import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, StatusBar, View} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from "react-navigation";
import ForumPage from './forum/forum-list.page'
import ForumDetailPage from './forum/forum-detail.page'
import ForumAddPage from './forum/forum-add.page';
import HomePage from "./home/home.page";
import LoginPage from './user/login.page';
import MePage from "./user/me.page";
import SettingPage from './user/setting.page';
import MapPage from './map/map.page';
import EventPage from './event/event.page';
import ProfileModifyPage from './user/profileModify.page';
import BookPage from './book/book.page';
import BookAddPage from './book/book-add.page.page';
import BookDetailPage from './book/book-detail.page.page';




const tabs = TabNavigator({
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
            )
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
            )
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
const TabsNav = StackNavigator({
    Tabs: {screen: tabs},
    ForumDetailPage: {screen: ForumDetailPage},
    ForumAddPage:{screen:ForumAddPage},
    LoginPage: {screen: LoginPage},
    SettingPage: {screen: SettingPage},
    MapPage:{screen:MapPage},
    BookPage:{screen:BookPage},
    BookAddPage:{screen:BookAddPage},
    BookDetailPage:{screen:BookDetailPage},
    EventPage:{screen:EventPage},
    ProfileModifyPage:{screen:ProfileModifyPage},
}, {
    onNavigationStateChange: () => {
        alert(1)
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,
    },
});

//trigger custom functions each time for clicking tab button
class App extends Component {
    render() {
        return (
            <TabsNav onNavigationStateChange={(prev, current) => {
                let index = current.routes[0].index;
                if ((index === 0 || index === 3) && current.index === 0) {
                    StatusBar.setBarStyle('dark-content', false);
                } else if (current.index === 0) {
                    StatusBar.setBarStyle('light-content', false);
                }
            }}/>
        )
    }
}


// AppRegistry.registerComponent('AtYorkU', () => SimpleApp);
AppRegistry.registerComponent('AtYorkU', () => App);