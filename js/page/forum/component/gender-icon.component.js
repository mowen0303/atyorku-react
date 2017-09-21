import React, {Component, PropTypes} from 'react';
import {Image, StyleSheet} from 'react-native';


export default class GenderIcon extends Component {

    static propTypes = {
        gender: PropTypes.string
    }


    render() {
       return this.elementForGenderIcon();
    }

    elementForGenderIcon() {
        if (this.props.data.gender === '0') {
            return <Image style={styles.userIcon}
                          source={require("../../../../res/icon/girl.png")}/>
        } else if (this.props.data.gender === '1') {
            return <Image style={styles.userIcon}
                          source={require("../../../../res/icon/boy.png")}/>
        } else {
            return <Image style={styles.userIcon}
                          source={require("../../../../res/icon/neutral.png")}/>
        }

    }
}

const styles = StyleSheet.create({

    userIcon: {
        height: 15,
        width: 15,
        margin: 3,
        marginLeft: 6
    }
});