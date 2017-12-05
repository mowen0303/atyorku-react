import CommonService from '../../../service/common.service'
import {AsyncStorage, Alert} from 'react-native';

export default class MapService {

    static getLocationList() {
        let url = `${CommonService.host}/admin/map/locationController.php?action=getAllLocations`;
        //let url = `http://10.0.2.2/admin/map/locationController.php?action=getAllLocations`;
        console.log(fetch(url));
        return fetch(url).then(response => response.json());

    }

    static saveLocationsToLocalStorage(data) {
        AsyncStorage.setItem('locations', JSON.stringify(data), (error) => {
            if (error) {
                Alert.alert('储存提示', '地图储存功能失败，请联系管理员微信号:jiyu55')
            }
        })
    }

    static getLocationsFromLocalStorage() {
        return AsyncStorage.getItem('locations').then(result => JSON.parse(result));
    }

}