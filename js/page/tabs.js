import React from 'react';
import {AppRegistry, Image, StyleSheet} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from "react-navigation";
import ForumPage from './forum/forum-list.page'
import ForumDetailPage from './forum/forum-detail.page'


const TabsNavigator = TabNavigator({
    Home: {
        screen: ForumPage,
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
        }
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
        screen: ForumPage,
        navigationOptions: {
            tabBarLabel: '我',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../../res/icon/me.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        }
    },

}, {tabBarComponent: TabBarBottom, tabBarPosition: 'bottom',lazy: true, tabBarOptions:{activeTintColor:'#f14b61',style:{backgroundColor:'#fff',borderTopWidth:0}}});

//所有的页面都要在这里进行注册
const SimpleApp = StackNavigator({
    Tabs: {screen: TabsNavigator},
    ForumDetailPage: {screen: ForumDetailPage},
})

const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,
    },
});


AppRegistry.registerComponent('AtYorkU', () => SimpleApp);