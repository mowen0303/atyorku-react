import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput, Picker, Animated, ListView, StatusBar, Text} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import LoadMoreBar from '../../commonComponent/loadingView';


export default class ForumAddPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            category:null,
            bounceValue: new Animated.Value(0),
        }
    }

    static navigationOptions = {
        title: '发布',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff'
    }

    componentDidMount() {

        this.state.bounceValue.setValue(1.5);     // Start large
        Animated.decay(position, {   // coast to a stop
            velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
            deceleration: 0.997,
        }).start();                                // Start the animation
    }

    render() {

        return (
            <Animated.Image                         // Base: Image, Text, View
                source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                style={{
                    flex: 1,
                    transform: [                        // `transform` is an ordered array
                        {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
                    ]
                }}
            />
            // <ScrollView style={styles.container}>
            //
            //     <TextInput multiline={true} style={styles.textInput}/>
            //     <Picker style={{backgroundColor:'#ccc'}}
            //         selectedValue={this.state.language}
            //         onValueChange={(category) => this.setState({language: category})}>
            //         <Picker.Item label="Java" value="java" />
            //         <Picker.Item label="JavaScript" value="js" />
            //     </Picker>
            // </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding:16,
    },
    textInput:{
        backgroundColor:'#fff',
        height:150,
        fontSize:16,
        padding:10

    }
});