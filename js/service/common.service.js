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
        } else {
            value *= 1000;
            let date = new Date(value)
            return date.getFullYear() + "级";
        }
    }

    /**
     * Gender translator
     * @param value
     * @returns {*}
     */
    static pipeOfUserGender(value) {
        switch (value) {
            case "0":
                return "女";
            case "1":
                return "男";
            default:
                return "不明";
        }
    }

    static uploadFile(url, filePostName, imgData, progressCallback, resolveCallback, rejectCallback) {

        let formData = new FormData();
        let file = {uri: imgData, type: 'multipart/form-data', name: 'image.png'};
        formData.append(filePostName, file);

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
                rejectCallback?rejectCallback():null;
                return;
            }

            if (oReq.status === 200) {
                try{
                    resolveCallback(JSON.parse(oReq.responseText));
                }catch (e){
                    rejectCallback?rejectCallback():null;
                }
                resolveCallback(JSON.parse(oReq.responseText));
            } else {
                rejectCallback?rejectCallback():null;
            }
        };

        oReq.open("POST", url, true);
        oReq.send(formData);
    }

}

