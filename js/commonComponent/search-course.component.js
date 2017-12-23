import React, { Component } from 'react';
import {
    FlatList,
    Image,
    TouchableHighlight,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';

export default class searchCourse extends Component {

    courseData = [];

    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            text: ''
        };
    }

    componentDidMount() {
        this.fetchCourseData();
    }

    fetchCourseData = async() => {
        const response = await fetch('http://www.atyorku.ca/admin/courseCode/courseCodeController.php?action=getListOfParentCourseCodeWithJson');
        const courseData = await response.json();
        this.courseData= courseData.result;
        await this.setState({ dataSource:courseData.result});
    }

    async searchCourseId(text){

        let courseResultList = this.courseData.filter((val) => {
            let item = val.title.toUpperCase();
            let queryWords = text.toUpperCase();
            return item.indexOf(queryWords) > -1;
        })

        await this.setState({
            dataSource: courseResultList
        })

    }



    render() {
        return (

            <View style={{flex:1}} >
                <View>
                    <TextInput
                        style={styles.InputContainer}
                        placeholder="Type the course name (Eg: ADMS)"
                        onChangeText={(text) => this.searchCourseId(text)}
                    />
                </View>
                <View style={styles.ListContainer} >
                    <FlatList
                        //style={{backgroundColor:"#ccc"}}
                        data={this.state.dataSource}
                        keyExtractor={(item,index) => index}
                        renderItem={({item}) => this._renderItem(item)}
                        ItemSeparatorComponent={({highlighted}) => this._renderItemSeparatorComponent(highlighted)}
                    />
                </View>
            </View>
        );
    }

    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{height:1, backgroundColor:"#000"}} />
    );

    _renderItem = (item) => {
        return (
            <TouchableOpacity onPress={()=>{this.courseCodeClickHandler(item.title)}} style={{height:50}}>
                <Text style={styles.ListText} >{item.title}</Text>
                <Text>{item.full_title}</Text>
            </TouchableOpacity>
        )
    }

    courseCodeClickHandler = (val)=>{
        alert(val); //此handler用于控制TouchableOpacity中的onPress事件
    }

}

const styles = StyleSheet.create({

    ListText:{
        fontSize: 20,
        fontWeight:'bold',
    },

    ListContainer:{
        marginTop: 15,
        margin:15,
    },

    InputContainer:{
        height:65,
        fontSize:20,
        fontWeight:'bold',
        justifyContent:'center',
    }

});