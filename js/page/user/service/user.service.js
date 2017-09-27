import React from 'react'
import {AsyncStorage, Alert} from 'react-native';

import CommonService from '../../../service/common.service';

export default class UserService {


    /**
     * Login
     * @param username : string
     * @param password : string
     * @returns {Promise.<TResult>|*}
     */
    static login(username, password) {
        let url = `${CommonService.host}/admin/login/loginController.php?action=userLogin`;

        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `username=${username}&password=${password}`
        }
        return fetch(url, options).then(response => response.json());
    }

    /**
     * logout
     * @returns {Promise.<TResult>|*}
     */
    static logout(){
        let url = `${CommonService.host}/admin/login/loginController.php?action=logoutWithJson`;
        return fetch(url).then(response => response.json());
    }


    /**
     * save user data
     * @param data : object<json.result>
     */
    static setUserDataToLocalStorage(data) {
        AsyncStorage.setItem('userData', JSON.stringify(data), (error) => {
            if (error) {
                Alert.alert('储存提示', '本地储存功能失败，请联系管理员微信号:jiyu55')
            }

        })
    }

    /**
     * get user data
     * @returns {*|Promise}
     */
    static getUserDataFromLocalStorage(callback) {
        AsyncStorage.getItem('userData', (error,result) => {
            if (result !== null) {
                callback(JSON.parse(result));
            }

        })
    }

    /**
     * delete user data
     */
    static removeUserDataFromLocalStorage(){
        AsyncStorage.removeItem('userData');
    }




}