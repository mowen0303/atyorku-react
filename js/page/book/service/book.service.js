import React from 'react'
import {AsyncStorage, Alert, DeviceEventEmitter} from 'react-native';

import CommonService from '../../../service/common.service';

export default class BookService {


    /**
     * Get books
     * @param page
     * @returns {Promise.<TResult>|*}
     */
    static getBooks(page) {
        let url = `${CommonService.host}/admin/book/bookController.php?action=getListOfBooksWithJson&pageSize=20&page=${page}`;
        return fetch(url).then(response => response.json());
    }

}
