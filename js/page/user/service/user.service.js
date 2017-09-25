import CommonService from '../../../service/common.service';

export default class UserService {


    static login(username, password) {
        let url = `${CommonService.host}/admin/login/loginController.php?action=userLogin`;

        const options = {
            method:'POST',
            headers:{"Content-Type": "application/x-www-form-urlencoded"},
            body:`username=${username}&password=${password}`
        }

        console.log(options.body);

        return fetch(url, options).then(response => response.json());
    }


}