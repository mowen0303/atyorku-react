import {StyleSheet, Platform} from 'react-native';

export default globalStyles = StyleSheet.create({
    font:{
        fontFamily: (Platform.OS === 'ios') ? 'PingFang SC' : 'normal',
    },
    fontLight:{
        fontFamily: (Platform.OS === 'ios') ? 'PingFangSC-Light' : 'normal',
    },
    inputBox: {
        flexDirection: 'row',
        marginTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height:40,
    },
    input: {
        padding: 0,
        paddingBottom: 10,
        color: "#484848",
        marginLeft: 14,
        flex: 1,
        marginTop: 3,
        height: 32,
        lineHeight: 32,
    },
})