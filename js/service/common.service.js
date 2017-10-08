export default class CommonService {

    static host = 'http://www.atyorku.ca';

    /**
     * 翻译专业-入学时间-年级
     * @param value
     * @param suffix
     * @returns {*}
     */
    static pipeOfUserInfo(value, suffix) {
        if (value == null || value == "" || value == " ") {
            return '未知' + suffix;
        } else {
            return value;
        }
    }

    /**
     * 入学时间 - 翻译时间戳
     * @param value
     * @returns {*}
     */
    static pipeOfUserEnrolmentYear(value) {
        if (value == 0) {
            return "";
        }else{
            value*=1000;
            let date = new Date(value)
            return date.getFullYear()+"级";
        }
    }

    /**
     * Gender translator
     * @param value
     * @returns {*}
     */
    static pipeOfUserGender(value){
        switch(value){
            case "0":
                return "女";
            case "1":
                return "男";
            default:
                return "不明";
        }
    }

}

