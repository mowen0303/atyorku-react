import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ToastAndroid} from 'react-native';

const {width} = Dimensions.get('window');

export default class SearchResultList extends Component {

    constructor() {
        super();
        this.state = {
            onEndReachedThreshold: 10
        }
    }

    static propTypes = {
        parentPage:PropTypes.object,
    }

    renderItem = (data) => {
        return(
            <TouchableOpacity onPress={()=>{
                this.props.parentPage.setState({showResult:false});
                this.props.parentPage.onReceiveDataFromList(data);
                this.props.parentPage.refs.searchBar.blur();
            }}>
                <View style={styles.item}>
                    <Image style={styles.logo}/>
                    <View style={styles.text}>
                        <Text style={styles.fullName}>{data.item.init}</Text>
                        <Text style={styles.init}>{data.item.full_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <FlatList style={styles.list}
                      data={this.props.data}
                      extraData={super.state}
                      keyExtractor={item => item.id}
                      renderItem={this.renderItem}
                      // ListHeaderComponent={this.listHeaderComponent}
                      // ListFooterComponent={this.listFooterComponent}
                      // onEndReached={() => this.getComments()}
                      onEndReachedThreshold={this.state.onEndReachedThreshold}
                      keyboardShouldPersistTaps={'handled'}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
        marginHorizontal: 15,
        borderBottomColor: 'rgba(0,0,0,0)',
        marginTop: 0,
    },
    item: {
        padding:5,
        borderWidth: 1,
        borderColor:'#ddd',
        backgroundColor:'#fff',
        borderTopWidth:0,
        width: width * 0.93,

        // flex:1,
        // display:'flex',
        // width: '93%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: "center",
        // backgroundColor:'#fff',
    },
    logo: {
        width: 20,
    },
    text: {

    },
    fullName: {
        fontSize: 16,
        color: '#000',
    },
    init: {
        fontSize: 14,
    }
});