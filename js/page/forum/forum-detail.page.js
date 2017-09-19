import React, {Component} from 'react';
import {View, StyleSheet, Text, ListView, Image} from 'react-native';
import NavigationBar from '../../commonComponent/navigationBar';
import ForumService from '../../service/forum.service';


export default class ForumDetailPage extends Component {

    page = 1;
    metadata = [];


    constructor(props) {
        super(props);
        this.state = {
            listViewDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loadingMore: false
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: `123`,
    });


    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.listViewDataSource}
                    renderRow = {(data)=><Text data={data}>{data.content_comment}</Text>}
                />
            </View>
        )
    }

    componentDidMount() {
        this.getComments()
    }

    getComments() {
        ForumService.getComments(2045, this.page)
            .then((json) => {
                if (json.code == 1) {
                    this.metadata = json.secondResult;
                    this.setState({
                        listViewDataSource: this.state.listViewDataSource.cloneWithRows(this.metadata)
                    });
                }
            })
            .catch((error) => alert(error));
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    navigationBar: {
        backgroundColor: '#fff',
    },
    navBtnView: {
        flexDirection: 'row'
    },
    navBtnImg: {
        width: 18,
        height: 18,
        marginLeft: 5,
        marginRight: 5,
        tintColor: '#fff'
    }
});