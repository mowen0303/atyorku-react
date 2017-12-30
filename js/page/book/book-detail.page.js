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
        BookService.getBookImages(this.state.data.id)
            .then(async (json) => {
                if (json.code===1) {
                    await this.setState({images:json.result.map(img=>({url:img.url}))});
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    imageSwiper() {
        return (
            <Swiper style={{flex:1}}
                onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                dot={
                    <View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />
                }
                activeDot={
                    <View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />
                }
                paginationStyle={{bottom: -23, left: null, right: 10}} loop autoplay
            >
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
