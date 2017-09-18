export default class CommonService {

    static host = 'http://www.atyorku.ca';

    static pipeOfUserInfo(value, suffix) {
        if (value == null || value == "" || value == " ") {
            return '未知' + suffix;
        } else {
            return value;
        }
    }

}

