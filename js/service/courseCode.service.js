import React from 'react'
import {AsyncStorage, Alert, DeviceEventEmitter} from 'react-native';

import CommonService from './common.service';

export default class CourseCodeService {

    static getCourseCodeParents() {
        let url=`${CommonService.host}/admin/courseCode/courseCodeController.php?action=getListOfParentCourseCodeWithJson`;
        return fetch(url).then(response => response.json());
    }

    static getCourseCodeChildrenByParentId(id) {
        let url=`${CommonService.host}/admin/courseCode/courseCodeController.php?action=getListOfChildCourseCodeByParentIdWithJson&course_code_parent_id=${id}`;
        return fetch(url).then(response => response.json());
    }

}
