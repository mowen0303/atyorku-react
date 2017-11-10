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

    static getBookCategories() {
        let url=`${CommonService.host}/admin/bookCategory/bookCategoryController.php?action=getListOfBookCategoryWithJson`;
        return fetch(url).then(response => response.json());
    }

    static getBookImages(id) {
        let url = `${CommonService.host}/admin/book/bookController.php?action=getImagesByBookId&id=${id}`;
        return fetch(url).then(response => response.json());
    }

    static addBook(images, data, progressCallback, resolveCallback, rejectCallback) {
        let formData = new FormData();
        if (images !== false && images !== null) {
            images.forEach(imgURI => {
                let file = {uri: imgURI, type: 'image/jpeg', name: 'image.jpg'};
                formData.append("imgFile[]", file);
            });
        }
        if (data !== false && data !== null) {
            formData.append('flag','add');
            formData.append('name',data.name);
            formData.append('book_category_id',data.category);
            formData.append('course_code_child_id',data.courseCode.courseCodeChild);
            formData.append('price',data.price);
            formData.append('description',data.description);
            formData.append('image_id_one',"");
            formData.append('image_id_two',"");
            formData.append('image_id_three',"");
        }

        let url = `${CommonService.host}/admin/book/bookController.php?action=addBookWithJson`;
        let oReq = new XMLHttpRequest();

        if(progressCallback){
            oReq.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    progressCallback(Math.floor(e.loaded / e.total *100)+"%");
                } else {
                    console.log("无进度");
                }
            }
        }

        oReq.onreadystatechange = (e) => {
            if (oReq.readyState !== 4) {
                return;
            }

            if (oReq.status === 200) {
                try{
                    console.log(oReq.responseText);
                    resolveCallback(JSON.parse(oReq.responseText));
                }catch (e){
                    console.log("Failed. " + e);
                    rejectCallback?rejectCallback():null;
                }
            } else {
                rejectCallback?rejectCallback():null;
            }
        };

        oReq.open("POST", url, true);
        oReq.send(formData);
    }

}
