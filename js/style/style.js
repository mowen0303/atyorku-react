import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
    font:{
        fontFamily: (Platform.OS === 'ios') ? 'PingFang SC' : 'normal',
    }
})