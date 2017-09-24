import {StyleSheet, Platform} from 'react-native';

export default globalStyles = StyleSheet.create({
    font:{
        fontFamily: (Platform.OS === 'ios') ? 'PingFang SC' : 'normal',
    },
    fontLight:{
        fontFamily: (Platform.OS === 'ios') ? 'PingFangSC-Light' : 'normal',
    }
})