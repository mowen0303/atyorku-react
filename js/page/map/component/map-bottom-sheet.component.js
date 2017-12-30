import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Platform, Linking, Alert} from 'react-native';

export default class MapBottomSheet extends Component {

    constructor() {
        super();
        this.state = {}
    }

    static propsTypes = {

    }

    render() {
        return(
            <View style={styles.card}>
                <View style={[styles.titleCard, styles.container]}>
                    <View style={styles.title}>
                        <Text style={styles.buildingName}>{this.props.data? this.props.data.item.full_name : "null" }</Text>
                        <Text style={styles.buildingInit}>{this.props.data? this.props.data.item.init : "null"}</Text>
                    </View>
                    <TouchableOpacity style={styles.iconContainer}
                                      onPress={()=>{
                                          if(this.props.data) {
                                              if (Platform.OS == 'android') {
                                                  Linking.openURL("http://maps.google.com/maps?q=loc:"+this.props.data.item.latitude+","+this.props.data.item.longitude+"("+this.props.data.item.full_name+")");
                                              } else {
                                                  Linking.openURL("http://maps.apple.com/?daddr="+this.props.data.item.latitude+","+this.props.data.item.longitude);
                                              }
                                          } else {
                                              Alert.alert("", "地点数据为null")
                                          }
                                      }}
                    >
                        <Image style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.buildingInfo}>{this.props.data? this.props.data.item.info : "null"}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
        marginBottom: 0,
        width: '100%',
        borderRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    container: {
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    iconContainer: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
    },
    icon: {
        height: 50,
        width: 50,
    },
    titleCard: {
        backgroundColor: '#db4437',
        borderRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexDirection: 'row'
    },
    title: {
        flex: 1,
    },
    buildingName: {
        color: '#fff',
        fontSize: 24,
    },
    buildingInit: {
        color: 'rgba(255,255,255,0.8)',
    },
    buildingInfo: {
        color: '#000',
    }
});