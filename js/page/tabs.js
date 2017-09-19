import React, {Component} from 'react';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ForumPage from './forum/forum-list.page'
import ForumDetailPage from './forum/forum-detail.page'
import {StackNavigator,} from 'react-navigation';

export default class TabsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        }
    }

    static navigationOptions = {
        headerStyle:{height:200}
    };


    render() {
        return (
            <View style={styles.container}>
                <StatusBar/>
                <TabNavigator tabBarStyle={styles.tab} tabBarShadowStyle={{bottom: 0, top: null}}>
                    <TabNavigator.Item
                        title="首页"
                        titleStyle={styles.tabItem}
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={styles.tabLabelActivated}
                        renderIcon={() => <Image style={styles.tabIcon} source={require('../../res/icon/home.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabIcon, styles.tabIconActivated]}
                                                         source={require('../../res/icon/home.png')}/>}
                        badgeText="10"
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        {detail}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="课评"
                        titleStyle={styles.tabItem}
                        selected={this.state.selectedTab === 'course'}
                        selectedTitleStyle={styles.tabLabelActivated}
                        renderIcon={() => <Image style={styles.tabIcon} source={require('../../res/icon/course.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabIcon, styles.tabIconActivated]}
                                                         source={require('../../res/icon/course.png')}/>}
                        onPress={() => this.setState({selectedTab: 'course'})}>
                        <View style={styles.page}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="同学圈"
                        titleStyle={styles.tabItem}
                        selected={this.state.selectedTab === 'forum'}
                        selectedTitleStyle={styles.tabLabelActivated}
                        renderIcon={() => <Image style={styles.tabIcon} source={require('../../res/icon/forum.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabIcon, styles.tabIconActivated]}
                                                         source={require('../../res/icon/forum.png')}/>}
                        onPress={() => this.setState({selectedTab: 'forum'})}>
                        <ForumPage/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="我"
                        titleStyle={styles.tabItem}
                        selected={this.state.selectedTab === 'me'}
                        selectedTitleStyle={styles.tabLabelActivated}
                        renderIcon={() => <Image style={styles.tabIcon} source={require('../../res/icon/me.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabIcon, styles.tabIconActivated]}
                                                         source={require('../../res/icon/me.png')}/>}
                        onPress={() => this.setState({selectedTab: 'me'})}>
                        <View style={styles.page}></View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}



const detail = StackNavigator({
    detail: {screen: ForumDetailPage},
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    tab: {
        backgroundColor: '#ffffff',
    },
    tabItem: {
        color:'#555'
    },
    tabIcon: {
        width: 22,
        height: 22,
        tintColor: '#555'
    },
    tabIconActivated: {
        tintColor: '#f14b61'
    },
    tabLabelActivated: {
        color: '#f14b61'
    }
});