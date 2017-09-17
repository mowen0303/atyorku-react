import CommonService from './common.service'

export default class ForumService {

    static getForumCategories(){
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumClassListWithJson`;
        return fetch(url).then(response=>response.json());
    }

}