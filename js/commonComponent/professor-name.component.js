import React, { Component } from 'react';
import {
    TouchableOpacity,
    FlatList,
    Image,
    TouchableHighlight,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';


export default class App extends Component {

    professorData = [];

    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            text: ''
        };
    }

    fetchOnlineProfessor = async(queryWord) => {
        const response = await fetch('http://www.atyorku.ca/admin/professor/professorController.php?action=getListOfProfessorWithJson&query=' + queryWord);
        const professorData = await response.json();
        if(professorData.code == 1){
            this.professorData = professorData.result;
            await this.setState({
                dataSource: professorData
            });
            this.filterLocalProfessor(queryWord);
        }else {
            alert("找不到此教授哟,请重新搜索!");
        }

    }

    async filterLocalProfessor(text){

        let professorResultList = this.professorData.filter((val) => {

            let item = val.lastname.toUpperCase();
            let queryWords = text.toUpperCase();
            return item.indexOf(queryWords) > -1;
        })
        await this.setState({
            dataSource: professorResultList
        });

        if(professorResultList == ""){
            alert("找不到此教授哟,请重新搜索!");
        }


        //console.warn(dataSource);

    }


    fetchProfessor(queryWord){

        if(queryWord.length <= 3) {
            this.fetchOnlineProfessor(queryWord);
        }else{
            this.filterLocalProfessor(queryWord);
        }
    }


    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{height:1, backgroundColor:"#000"}} />
    );


    _renderItem = (item) => {

        return (
            <TouchableOpacity onPress={() => { this.professorClickHandler(item.lastname) }} style={{height: 40}}>
                <Text style={styles.ListText}>{item.firstname}  {item.lastname}</Text>
            </TouchableOpacity>
        )

    }


    professorClickHandler = (val) => {
        alert("This is " + val); // 此handler用于控制TouchableOpacity中的onPress事件
    }



    render() {
        return (

            <View style={{flex:1}} >
                <View>
                    <TextInput
                        style={styles.InputContainer}
                        placeholder="Type the professor name (Eg: Alex)"
                        onChangeText={(text) => this.fetchProfessor(text)}
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

}

const styles = StyleSheet.create({

    ListText:{
        fontSize: 20,
        fontWeight:'bold',
        marginTop:5,
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
