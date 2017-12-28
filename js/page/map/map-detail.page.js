import React, {Component} from 'react';
import {View, StyleSheet, Text, Button, ScrollView, Image} from 'react-native';

export default class MapDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = { }
    }

    static locations = {
        location: {
            name: "Lassonde Building",
            latitude: 43.773966,
            longitude: -79.505355,
            info: "The Department of Electrical Engineering and Computer Science, Lassonde School of Engineering, is one of the leading academic research departments in Canada.",
            pic: '../res/lassonde.jpg',
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor: "#fff"},
        title: "Lassonde Building",  // How to use change it base on what passed through???
        headerTintColor: "#484848",
    };

    componentDidMount() {

    }

    render() {
        return(
            <ScrollView>
                <Image source={require(locations.location.pic)}  />
                <Text>{locations.location.name}</Text>
                <Text>{locations.location.info}</Text>
                <Button/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        top: 0,
    },
    title: {

    }
});