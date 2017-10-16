import {AsyncStorage} from 'react-native';
import CommonService from '../../../service/common.service'

export default class ForumService {

    /**
     * Get categories
     * @returns {Promise.<TResult>|*}
     */
    static getCategories() {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumClassListWithJson`;
        return fetch(url).then(response => response.json());
    }

    static saveCategoriesToLocalStorage(data) {
        AsyncStorage.setItem('forumCategories', JSON.stringify(data), (error) => {
            if (error) {
                Alert.alert('储存提示', '本地储存功能失败，请联系管理员微信号:jiyu55')
            }
        })
    }

    static getCategoriesFromLocalStorage() {
        return AsyncStorage.getItem('forumCategories').then(result => JSON.parse(result));
    }

    static addForum(forum_class_id, content, price, category, img1, progressCallback, resolveCallback, rejectCallback) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=addForumWithJson`;
        let optionalData = {
            flag: 'add',
            forum_class_id: forum_class_id,
            content: content,
            price: price,
            category: category
        };
        CommonService.uploadFile(url, 'img1', img1, optionalData, progressCallback, resolveCallback, rejectCallback);
    }

    /**
     * Get forums
     * @param categoryId
     * @param page
     * @returns {Promise.<TResult>|*}
     */
    static getForums(categoryId, page) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumListWithJson&pageSize=20&forum_class_id=${categoryId}&page=${page}`;
        return fetch(url).then(response => response.json());
    }

    /**
     * Get comments
     * @param forumId
     * @param page
     * @returns {Promise.<TResult>|*}
     */
    static getComments(forumId, page) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumCommentListWithJson&forum_id=${forumId}&pageSize=10&page=${page}`;
        //alert(url);
        return fetch(url).then(response => response.json());

    }

    /**
     * Add once view number
     * @param forumId
     * @returns {*}
     */
    static addOnceView(forumId) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=countViewOfForumByIdWithJson&id=${forumId}`;
        return fetch(url);
    }


}