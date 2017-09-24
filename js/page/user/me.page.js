import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, StatusBar, Image} from 'react-native';
import LoginPage from '../login/login.page';
import globalStyles from '../../style/style';
import GenderIcon from '../../commonComponent/gender-icon.component';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barStyle: 'dark-content',
        }
    }

    static navigationOptions = {
        //headerStyle:{backgroundColor:'#fff',shadowColor:'transparent'}
        header: null,
    }

    // componentDidMount() {
    //     this.props.navigation.setParams({login: this.login})
    // }

    componentDidMount() {

    }

    login = () => {
        this.props.navigation.navigate('LoginPage')
    }


    render() {

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#0e7477" barStyle={this.state.barStyle}/>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.profileBox}>
                        <View style={{flex: 1, marginRight: 10}}>
                            <Text style={[styles.alias, globalStyles.font]}>Jerry</Text>
                            <Text numberOfLines={2} style={[styles.description, globalStyles.fontLight]}>水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费</Text>
                        </View>
                        <View>
                            <Image style={styles.avatar} source={require('../../../res/images/test.jpg')}/>
                            <GenderIcon genderStyle={{position: 'absolute', top: 59, right: 23}} gender={"1"}/>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    profileBox: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alias: {
        color: "#484848",
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 6
    },
    description: {
        fontSize: 15
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
    }

})
