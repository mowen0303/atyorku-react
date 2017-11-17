import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

export default class SearchResultList extends Component {

    constructor() {
        super();
    }

    renderItem = (data) => {
        return(
            <TouchableOpacity>
                <View>
                    <Text>{data.item.full_name}</Text>
                    <Text>{data.item.init}</Text>
                    // TODO - in the future add icon to mark different function of different buildings
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <FlatList style={{flex:1}}
                      data={this.props.data}
                      extraData={super.state}
                      keyExtractor={(item, index) => item.id}
                      // ListHeaderComponent={this.listHeaderComponent}
                      renderItem={this.renderItem}
                      // ListFooterComponent={this.listFooterComponent}
                      // onEndReached={() => this.getComments()}
                      onEndReachedThreshold={this.state.onEndReachedThreshold}
            />
        )
    }
}

const styles = StyleSheet.create({

});