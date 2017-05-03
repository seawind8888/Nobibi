/**
 * 城市选择
 */
'use strict';
import React from 'react';
import {
    Dimensions,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ListView,
    ScrollView,
    TextInput,
} from 'react-native';

import {NaviGoBack} from '../common/CommonUtils';
import ShortLineTwo from '../component/ShortLineTwo';

var {height, width} = Dimensions.get('window');

class InvestmentSingle extends React.Component {
    constructor(props) {
        super(props);
        this.buttonBackAction = this.buttonBackAction.bind(this);
        this.state = {}
    }

    //返回
    buttonBackAction() {
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }

    render() {
        const {navigator, route} = this.props;
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
                <View style={{height:60,backgroundColor:'#389e7f',paddingTop:10,flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                                      style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                        <Image
                            style={{width:13,height:20}}
                            source={require('../imgs/ic_center_back.png')}
                        />
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>{route.order.shopName === undefined ? ['新手团'] : route.order.shopName}</Text>
                    </View>
                    <View style={{width:48,height:48}}/>
                </View>
                <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                    <View style={{flex:1}}>
                        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                            <View style={{flexDirection:'row',height:100,backgroundColor:'white',alignItems:'center',marginTop:5}}>
                                <View style={{width:(width - 1) / 2,justifyContent:'center',paddingLeft:15,flexDirection:'column'}}>
                                    <Text style={{fontSize:28,color:'red'}}>{route.order.title === undefined ? ['10%'] : route.order.title}</Text>
                                    <Text style={{fontSize:14,marginTop:5}}>预期年化收益</Text>
                                </View>
                                <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:80}}/>
                                <View style={{width:(width - 1) / 2,justifyContent:'center',paddingLeft:15,flexDirection:'column'}}>
                                    <Text style={{fontSize:28,color:'black'}}>123,456,789</Text>
                                    <Text style={{fontSize:14,marginTop:5}}>开放额度</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'column',height:100,alignItems:'flex-start',paddingLeft:15}}>
                                <Text style={{fontSize:14,marginTop:10}}>投资金额</Text>
                                <TextInput
                                    style={{height: 45,marginTop:10, width:width-30,borderColor: '#b1b1b1',paddingLeft:10, backgroundColor:'#ffffff',borderWidth: 1}}
                                    placeholder='1元起投'
                                    placeholderTextColor="#aaaaaa"/>
                            </View>
                            <View style={{flexDirection:'row',backgroundColor:'white',height:45,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{marginLeft:10}}>优惠券</Text>
                                <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                    <Text style={{fontSize:14,color:'red'}}>0张可用</Text>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                    <View style={{justifyContent:'flex-end'}}>
                        <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                            <Text style={{marginLeft:10}}>总计¥5000</Text>
                            <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14,color:'red'}}>总计¥5000</Text>
                            </View>
                        </View>
                        <ShortLineTwo/>
                        <TouchableWithoutFeedback>
                            <View style={styles.item_layout}>
                                <Text style={{color:'#ffffff',fontSize:18}}>立即投资</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    item_layout: {
        backgroundColor:'#389e7f',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    item_view_icon: {
        width: 10,
        height: 15,
    },
});
export default InvestmentSingle