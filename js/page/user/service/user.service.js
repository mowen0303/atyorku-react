import React from 'react'
import {AsyncStorage, Alert} from 'react-native';

import CommonService from '../../../service/common.service';

export default class UserService {


    static login(username, password) {
        let url = `${CommonService.host}/admin/login/loginController.php?action=userLogin`;

        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `username=${username}&password=${password}`
        }

        console.log(options.body);

        return fetch(url, options).then(response => response.json());
    }


    static setUserData(data) {
        AsyncStorage.setItem('userData', JSON.stringify(data), (error) => {
            if (error) {
                Alert.alert('储存提示', '本地储存功能失败，请联系管理员微信号:jiyu55')
            }

        })
    }

    static getUserData() {
        return AsyncStorage.getItem('userData', (error, result) => {
            if (!error) {
                return result;
            } else {
                callback();
                Alert.alert('读取提示', error);
            }
        })
    }


}