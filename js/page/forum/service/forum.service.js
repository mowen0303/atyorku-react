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
    static addOnceView(forumId){
        let url=`${CommonService.host}/admin/forum/forumController.php?action=countViewOfForumByIdWithJson&id=${forumId}`;
        return fetch(url);
    }



}