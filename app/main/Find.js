/**
 * 购物车页面
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    RefreshControl,
    InteractionManager,
    StyleSheet,
    ListView
} from 'react-native';
import WebViewContainer from './WebViewContainer';
import NewsSingle from './NewsSingle';
import {connect} from 'react-redux';
import {newsFetch} from '../actions/newsAction';
import * as Progress from 'react-native-progress';
const {height, width} = Dimensions.get('window');

class Find extends Component {
    constructor(props) {
        super(props);
        this.onPressItem = this
            .onPressItem
            .bind(this);
        this.renderItem = this
            .renderItem
            .bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }

    }

    componentWillMount() {
        return this.onScrollDown()
    }

    //下拉刷新
    onScrollDown() {
        const {dispatch} = this.props;
        dispatch(newsFetch())
    }

    onPressItem(news) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({component: WebViewContainer, name: 'WebViewContainer', news});
        });
    }

    renderContent(dataSource) {
        const {News} = this.props;
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
                style={{
                backgroundColor: '#f5f5f5',
                flex: 1
            }}
                onEndReachedThreshold={10}
                refreshControl={< RefreshControl refreshing = {
                News.isLoading
            }
            onRefresh = {
                () => this.onScrollDown()
            }
            title = "正在加载中……" color = "#ccc" />}
                enableEmptySections={true}/>
        );
    }

    renderItem(news, rowID) {
        let iconUrl = JSON.parse(news.smeta);
        return (
            <View>
                <View style={styles.item_view_zhanwei}></View>
                <TouchableWithoutFeedback
                    onPress={() => {
                    this.onPressItem(news)
                }}>
                    <View
                        style={{
                        backgroundColor: '#ffffff'
                    }}>
                        <View style={styles.item_view_center}>
                            <Text
                                style={{
                                color: 'black',
                                fontSize: 16
                            }}>{news.post_title}</Text>
                        </View>
                        <View style={styles.item_view_center_msg}>
                            <View style={styles.item_view_center_title_img}>
                                <Image
                                    source={{
                                    uri: iconUrl.thumb
                                }}
                                    style={styles.item_view_center_title}/>
                                <View
                                    style={{
                                    width: width - 95,
                                    marginLeft: 10
                                }}>
                                    <Text style={styles.item_view_center_time}>{news.post_excerpt}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    render() {
        const {News} = this.props;
        return (
            <View
                style={{
                flex: 1,
                backgroundColor: '#f5f5f5'
            }}>
                <View
                    style={{
                    height: 60,
                    backgroundColor: '#389e7f',
                    flexDirection: 'row',
                    paddingTop: 10
                }}>
                    <View
                        style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                            fontSize: 18,
                            color: 'white',
                            alignSelf: 'center'
                        }}>发现</Text>
                    </View>
                </View>
                <View style={{
                    flex: 1
                }}>
                    {this.renderContent(this.state.dataSource.cloneWithRows(News.newsList))}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item_view_zhanwei: {
        backgroundColor: '#f5f5f5',
        height: 8
    },
    item_view_center: {
        flexDirection: 'row',
        height: 25,
        marginLeft: 10,
        alignItems: 'flex-end'
    },
    item_view_icon: {
        width: 10,
        height: 15,
        marginLeft: 5
    },
    item_view_center_status: {
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 10
    },
    item_view_center_status_tv_img: {
        height: 20,
        width: 62,
        justifyContent: 'center',
        alignItems: "center"
    },
    item_view_center_status_tv: {
        color: 'white',
        fontSize: 10,
        backgroundColor: '#00000000'
    },
    item_view_center_msg: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-start'
    },
    item_view_center_icon: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    item_view_center_title_img: {
        flexDirection: 'row',
        width: width,
        marginTop: 10,
        marginLeft: 10

    },
    item_view_center_title: {
        width: 70,
        height: 50
    },
    item_view_center_time: {
        color: '#777',
        fontSize: 13
    },
    item_view_bottom: {
        flexDirection: 'row',
        height: 40
    },
    item_view_bottom_price_v: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_view_bottom_price: {
        color: 'red',
        fontSize: 14
    },
    item_view_bottom_again_v: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_view_bottom_again: {
        fontSize: 14,
        color: 'black'
    }
});

export default connect((state) => {
    const {News} = state;
    return {News}
})(Find);
// export default connect((state) => {     console.log(state);     return {
//    news: state.news     } })(Find);