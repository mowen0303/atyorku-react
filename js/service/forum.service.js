import CommonService from './common.service'

export default class ForumService {

    static getCategories(){
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumClassListWithJson`;
        return fetch(url).then(response=>response.json());
    }

    static getForums(categoryId, page) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumListWithJson&forum_class_id=${categoryId}&page=${page}`;
        return fetch(url).then(response=>response.json());
    }

}