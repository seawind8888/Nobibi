/**
 * 商城主页
 */
'use strict';
import React, {Component} from 'react';

import{
    View,
    Alert,
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
import OrderSingle from './InvestmentSingle';
import HomePageItem from '../component/HomePageItem'
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
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            orders: ORDER_DATA.data
        };

    }

    centerItemAction(position) {
        if (position === 0) {
            Alert.alert('标题','新手指引')
        } else if (position === 1) {
            Alert.alert('标题','平台数据')
        } else if (position === 2) {
            Alert.alert('标题','邀请有礼')
        } else if (position === 3) {
            Alert.alert('标题','敬请期待')
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
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <ViewPager
                        style={{height: 200, width: width}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>
                    <View style={{marginTop: 8}}>
                        <TouchableWithoutFeedback onPress={()=> {
                            this.onPressItem(this.state.orders)
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                paddingTop: 20,
                                paddingBottom: 20
                            }}>
                                <View style={{flex: 1, marginLeft: 8, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 18, marginTop: 5}}>新手团</Text>
                                    <Text style={{fontSize: 28, color: 'red', marginTop: 5}}>12%</Text>
                                    <Text style={{fontSize: 14, color: '#808080', marginTop: 5}}>预期年化收益</Text>
                                    <Text style={{fontSize: 14, color: '#ff8848', marginTop: 5}}>新手专享|每日付息|多重保障</Text>
                                    <View style={styles.center_item_wrap}>
                                        <Text style={styles.center_item_tv}>立即投资</Text>
                                    </View>
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{marginTop: 8, backgroundColor: 'white'}}>
                        <View style={{flexDirection: 'row', height: 100}}>
                            <HomePageItem
                                title="新手指引"
                                content="三部进阶理财高手"
                                icon={CENTER_IMGS[0]}
                                onPress={()=>{this.centerItemAction(0)}}
                            />
                            <Image source={require('../imgs/home/ic_home_shu.png')}
                                   style={{height: 80, marginTop: 10}}/>
                            <HomePageItem
                                title="平台数据"
                                content="安全可靠数据保障"
                                icon={CENTER_IMGS[1]}
                                onPress={()=>{this.centerItemAction(1)}}
                            />
                        </View>
                        <ShortLine/>
                        <View style={{flexDirection: 'row', height: 100}}>
                            <HomePageItem
                                title="邀请有礼"
                                content="邀请好友送红包"
                                icon={CENTER_IMGS[2]}
                                onPress={()=>{this.centerItemAction(2)}}
                            />
                            <Image source={require('../imgs/home/ic_home_shu.png')}
                                   style={{height: 80, marginTop: 10}}/>
                            <HomePageItem
                                title="敬请期待"
                                content="更多活动敬请期待"
                                icon={CENTER_IMGS[3]}
                                onPress={()=>{this.centerItemAction(3)}}
                            />
                        </View>
                    </View>
                    <View style={{marginTop: 8, flexDirection: 'row'}}>
                        <View style={{width: item_width, alignItems: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>123,456,789</Text>
                            <Text style={{fontSize: 12, color: '#cacaca', marginTop: 5}}>用户累计投资(元)</Text>
                        </View>
                        <Image source={require('../imgs/home/ic_home_shu.png')} style={{height: 40}}/>
                        <View style={{width: item_width, alignItems: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>123,456,789</Text>
                            <Text style={{fontSize: 12, color: '#cacaca', marginTop: 5}}>用户累计赚取(元)</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback>
                        <View style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
                            <Text style={{fontSize: 14, color: '#3b3738'}}>了解更多</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    center_item_wrap: {
        marginTop: 7,
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