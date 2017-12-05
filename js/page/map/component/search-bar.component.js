import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from "react-native";

export default class SearchBar extends Component {

    // TODO - lose focus when typing is done or when touching something else

    render() {
        return(
            <TextInput placeholder="去哪里？"
                       style={styles.searchBar}
                       underlineColorAndroid="rgba(0,0,0,0)"
            />
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        elevation: 1,
        textAlign:'center',
        backgroundColor: '#fff',
        width: '93%',
        height: 45,
        margin: 15,
        top: 0,
        borderRadius: 3,
    }
});