'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    ListView,
    TouchableWithoutFeedback,
    RefreshControl,
    StyleSheet,
    Image,
    Dimensions,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import {investFetch} from '../actions/investAction';
import InvestmentSingle from './InvestmentSingle';


const {height, width} = Dimensions.get('window');

class Invest extends Component {


    constructor(props) {
        super(props);
        this.onPressItem = this.onPressItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onScrollDown = this.onScrollDown.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentWillMount() {
       return this.onScrollDown()
    }

    //下拉刷新
    onScrollDown() {
        const {dispatch} = this.props;
        dispatch(investFetch())
    }

    //点击列表每一项响应按钮
    onPressItem(order) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: InvestmentSingle,
                name: 'InvestmentSingle',
                order
            });
        });
    }

    //进行渲染数据
    renderContent(dataSource) {
        const {Invest} = this.props;
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
                style={{backgroundColor: '#f5f5f5', flex: 1}}
                onEndReachedThreshold={10}
                enableEmptySections={true}
                refreshControl={
                        <RefreshControl
                            refreshing={Invest.isLoading}
                            onRefresh={() => this.onScrollDown() }
                            title="正在加载中……"
                            color="#ccc"/>
                }
                showsVerticalScrollIndicator={false}
            />
        );
    }

    //渲染每一项的数据
    renderItem(order) {
        return (
            <View>
                <View style={styles.item_view_zhanwei}></View>
                <TouchableWithoutFeedback onPress={()=> {
                    this.onPressItem(order)
                }}>
                    <View style={{backgroundColor: 'white'}}>
                        <View style={styles.item_view_top}>
                            <Text style={{color: 'black', fontSize: 16}}>{order.name}</Text>
                            <View style={styles.item_view_center_status}>
                                <Image source={require('../imgs/order/ic_order_status.png')}
                                       style={styles.item_view_center_status_tv_img}>
                                    <Text
                                        style={styles.item_view_center_status_tv}>{order.stauts === 1 ? '新手专享' : '投资返现'}</Text>
                                </Image>
                            </View>
                        </View>
                        <View style={styles.item_view_center_msg}>
                            <View style={styles.item_view_center_title_img}>
                                <Text style={styles.item_view_center_title}>{order.title}</Text>
                                <Text style={styles.item_view_center_time}>预期年化收益</Text>
                            </View>
                            <View style={styles.item_view_center_info}>
                                <Text style={styles.item_view_center_info_top}>{order.quit}</Text>
                                <Text style={styles.item_view_center_time}>{order.time}</Text>
                            </View>
                        </View>
                        <Image source={require('../imgs/order/ic_order_heng_shi.png')} style={{width: width}}/>
                        <View style={styles.item_view_bottom}>
                            <View style={styles.item_view_bottom_price_v}>
                                <Text style={styles.item_view_bottom_price}>{order.price}</Text>
                            </View>
                            <View style={styles.item_view_bottom_again_v}>
                                <View style={styles.item_view_bottom_btn}>
                                    <Text style={styles.item_view_bottom_again}>立即投资</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    render() {
        const {Invest} = this.props;
        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <View style={{height: 60, backgroundColor: '#389e7f', flexDirection: 'column', paddingTop: 10}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, color: 'white', alignSelf: 'center'}}>投资</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    {this.renderContent(this.state.dataSource.cloneWithRows(Invest.investList))}
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
    item_view_top: {
        flexDirection: 'row',
        height: 35,
        marginLeft: 20,
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
        height: 60,
        marginBottom: 10,
        alignItems: 'flex-end'
    },
    item_view_center_icon: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    item_view_center_title_img: {
        flex:1,
        marginLeft: 20
    },
    item_view_center_info: {
        marginRight: 20
    },
    item_view_center_info_top: {
        fontSize: 20,
        paddingBottom:5,
        color: '#000000',
        textAlign: 'right'
    },
    item_view_center_title: {
        fontSize: 33,
        color: 'red',
        marginTop: 5
    },
    item_view_center_time: {
        color: '#777',
        fontSize: 12,
        marginTop: 5
    },
    item_view_bottom: {
        flexDirection: 'row',
        height: 40
    },
    item_view_bottom_price_v: {
        flex: 1.5,
        marginLeft:20,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    item_view_bottom_price: {
        color: '#aaa',
        fontSize: 14
    },
    item_view_bottom_again_v: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_view_bottom_btn: {
        width: 120,
        height: 30,
        backgroundColor: '#389e7f',
                borderRadius: 10
    },
    item_view_bottom_again: {
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff',
        lineHeight: 30,
    }
});

export default connect((state) => {
    const {Invest} = state;
    return {
        Invest
    }
})(Invest);