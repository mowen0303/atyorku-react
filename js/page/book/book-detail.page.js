import React, {Component} from 'react'
import {View, StyleSheet, Button, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import BookService from './service/book.service';
import CommonService from '../../service/common.service';

export default class BookDetailPage extends Component {


    constructor(props) {
        super(props);
        this.props.data = this.props.navigation.state.params.data;
        this.state = {
            data: this.props.navigation.state.params.data,
            images: [{url:this.props.navigation.state.params.data.thumbnail_url}],
        }
        this.imageSwiper = this.imageSwiper.bind(this);
    }

    static navigationOptions = {
        headerStyle:{backgroundColor:"#fff"},
        title:'二手书',
        headerTintColor:"#484848"
    }

    componentDidMount () {
        console.log(this.state.images);
        let images = BookService.getBookImages(this.state.data.id);
        // this.setState({images:images});
    }

    imageSwiper() {
        return (
            <Swiper style={{flex:1}}>
                {
                    this.state.images.map((img,i)=>{
                        if (img!==null) {
                            return (
                                <View style={styles.slide} key={`imageView${i}`}>
                                    <Image key={`image${i}`} resizeMode='stretch' style={styles.slideImage} source={{uri:`${CommonService.host}${img.url}`}}/>
                                </View>
                                );
                        }
                    })
                }
            </Swiper>
        );
    }

    render(){

        return (
            <View style={styles.container}>
                <View style={{height:240}}>
                {this.imageSwiper()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    slideImage: {
        flex: 1,
    }
})
