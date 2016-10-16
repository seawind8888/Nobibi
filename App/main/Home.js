/**
 * 商城主页
 */
'use strict';
import React, {Component} from 'react';

import{
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    InteractionManager,
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import ShortLine from '../component/ShortLine';
import OrderSingle from './OrderSingle';
var {height, width} = Dimensions.get('window');
var item_width = (width - 1) / 2;

const BANNER_IMGS = [
    require('../imgs/home/1.jpg'),
    require('../imgs/home/2.png'),
    require('../imgs/home/3.jpg'),
    require('../imgs/home/4.png')
];
const CENTER_IMGS = [
    require('../imgs/home/img_1.png'),
    require('../imgs/home/img_2.png'),
    require('../imgs/home/img_3.png'),
    require('../imgs/home/img_4.png')
];
const ORDER_DATA = {
    "api": "GetOrderHistory",
    "v": "1.0",
    "code": "0",
    "msg": "success",
    "data": [{
        "id": 1,
        "shopName": "新手团",
        "orderStauts": 1,
        "icon": "",
        "title": '12%',
        "time": "预期年化收益",
        "price": '1元起投'
    }]
};

class Home extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.onPressItem = this.onPressItem.bind(this);
        this.centerItemAction = this.centerItemAction.bind(this);
        this.topItemAction = this.topItemAction.bind(this);
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            orders: ORDER_DATA.data
        };

    }

    centerItemAction(position) {
        if (position === 0) {

        } else if (position === 1) {

        } else if (position === 2) {

        } else if (position === 3) {

        }
    }

    topItemAction(position) {
        const {navigator} = this.props;
        if (position === 0) {
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                    component: City,
                    name: 'City'
                });
            });
        } else if (position === 1) {
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                    component: Search,
                    name: 'Search'
                });
            });
        }
    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page}/>
        );
    }


    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={4}/>;
    }

    onPressItem(order) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: OrderSingle,
                name: 'OrderSingle',
                order
            });
        });
    }

    render() {
        return (
            <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <ViewPager
                        style={{height:200,width:width}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>
                    <View style={{marginTop:8}}>
                        <TouchableWithoutFeedback onPress={()=>{this.onPressItem(this.state.orders)}}>
                            <View style={{flexDirection:'row',backgroundColor:'white',paddingTop:20,paddingBottom:20}}>
                                <View style={{flex:1,marginLeft:8,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:18,marginTop:5}}>新手团</Text>
                                    <Text style={{fontSize:28,color:'red',marginTop:5}}>12%</Text>
                                    <Text style={{fontSize:14,color:'#808080',marginTop:5}}>预期年化收益</Text>
                                    <Text style={{fontSize:14,color:'#ff8848',marginTop:5}}>新手专享|每日付息|多重保障</Text>
                                    <View style={styles.center_item_wrap}>
                                        <Text style={styles.center_item_tv}>立即投资</Text>
                                    </View>
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{marginTop:8,backgroundColor:'white'}}>
                        <View style={{flexDirection:'row',height:100}}>
                            <View style={{flexDirection:'row',width:item_width,marginTop:25}}>
                                <Image source={CENTER_IMGS[2]} style={{width:40,height:35,marginLeft:20,marginTop:3}}/>
                                <View style={{marginLeft:10,marginTop:5}}>
                                    <Text style={{fontSize:16}}>新手指引</Text>
                                    <Text style={{color:'#999',fontSize:12,marginTop:5}}>三部进阶理财高手</Text>
                                </View>
                            </View>
                            <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:80,marginTop:10}}/>
                            <View style={{flexDirection:'row',width:item_width,marginTop:25}}>
                                <Image source={CENTER_IMGS[1]} style={{width:40,height:40,marginLeft:20,marginTop:3}}/>
                                <View style={{marginLeft:10,marginTop:5}}>
                                    <Text style={{fontSize:16}}>平台数据</Text>
                                    <Text style={{color:'#999',fontSize:12,marginTop:5}}>安全可靠数据保障</Text>
                                </View>

                            </View>
                        </View>
                        <ShortLine/>
                        <View style={{flexDirection:'row',height:100}}>
                            <View style={{flexDirection:'row',width:item_width,marginTop:30}}>
                                <Image source={CENTER_IMGS[0]} style={{width:40,height:40,marginLeft:20}}/>
                                <View style={{marginLeft:10,marginTop:5}}>
                                    <Text style={{fontSize:16}}>邀请有礼</Text>
                                    <Text style={{color:'#999',fontSize:12,marginTop:5}}>邀请好友送红包</Text>
                                </View>
                            </View>
                            <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:80,marginTop:10}}/>
                            <View style={{flexDirection:'row',width:item_width,marginTop:30}}>
                                <Image source={CENTER_IMGS[3]} style={{width:40,height:40,marginLeft:20}}/>
                                <View style={{marginLeft:10,marginTop:5}}>
                                    <Text style={{fontSize:16}}>敬请期待</Text>
                                    <Text style={{color:'#999',fontSize:12,marginTop:5}}>更多活动敬请期待</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop:8,flexDirection:'row'}}>
                        <View style={{width:item_width,alignItems: 'center'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>123,456,789</Text>
                            <Text style={{fontSize:12,color:'#cacaca',marginTop:5}}>用户累计投资(元)</Text>
                        </View>
                        <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:40}}/>
                        <View style={{width:item_width,alignItems: 'center'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>123,456,789</Text>
                            <Text style={{fontSize:12,color:'#cacaca',marginTop:5}}>用户累计赚取(元)</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback>
                        <View style={{alignItems: 'center',marginTop:20,marginBottom:10}}>
                            <Text style={{fontSize:14,color:'#3b3738'}}>了解更多</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    center_item_wrap: {
        marginTop: 8,
        alignSelf: 'center',
        alignItems: 'center',
        width: 250,
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#3b3738'
    },
    center_item_tv: {
        fontSize: 18,
        color: '#ffffff'
    },
    page: {
        flex: 1,
        height: 200,
        width: width
    }
});
export default Home;