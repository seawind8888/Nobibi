/**
 * 商城主页
 */
'use strict';
import React, {Component} from 'react';

import {
    View,
    Alert,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    RefreshControl,
    ScrollView,
    InteractionManager
} from 'react-native';
import Swiper from 'react-native-swiper';
import ShortLine from '../component/ShortLine';
import HomePageItem from '../component/HomePageItem';
import InvestmentSingle from './InvestmentSingle';
import {connect} from 'react-redux';
import {investFetch} from '../actions/investAction';
const {height, width} = Dimensions.get('window');
const item_width = (width - 1) / 2;

const BANNER_IMGS = [require('../imgs/home/1.jpg'), require('../imgs/home/2.png'), require('../imgs/home/3.jpg'), require('../imgs/home/4.png')];
const CENTER_IMGS = [
    require('../imgs/home/img_1.png'),
    require('../imgs/home/img_2.png'),
    require('../imgs/home/img_6.png'),
    require('../imgs/home/img_3.png'),
    require('../imgs/home/img_5.png'),
    require('../imgs/home/img_4.png')
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.onPressItem = this
            .onPressItem
            .bind(this);
        this.centerItemAction = this
            .centerItemAction
            .bind(this);
        this.onScrollDown = this
            .onScrollDown
            .bind(this);
        this.state = {};

    }
    componentWillMount() {
        return this.onScrollDown()
    }

    //下拉刷新
    onScrollDown() {
        const {dispatch} = this.props;
        dispatch(investFetch())
    }

    centerItemAction(position) {
        if (position === 0) {
            Alert.alert('提示', '新手指引')
        } else if (position === 1) {
            Alert.alert('提示', '平台数据')
        } else if (position === 2) {
            Alert.alert('提示', '邀请有礼')
        } else if (position === 3) {
            Alert.alert('提示', '敬请期待')
        }
    }

    onPressItem(order) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({component: InvestmentSingle, name: 'InvestmentSingle', order});
        });
    }

    render() {
        const {Invest} = this.props;
        return (
            <View
                style={{
                backgroundColor: '#f5f5f5',
                flex: 1
            }}>
                <ScrollView
                    style={{
                    flex: 1
                    }}

                    refreshControl={
                        <RefreshControl
                            refreshing={Invest.isLoading}
                            onRefresh={() => this.onScrollDown() }
                            title="正在加载中……"
                            color="#ccc"/>
                    }
                    showsVerticalScrollIndicator={false}>
                    <Swiper
                        height={160}
                        autoplay={true}
                        autoplayTimeout={3}
                        bounces={true}
                        dot={< View style = {
                        styles.customDot
                    } />}
                        activeDot={< View style = {
                        styles.customActiveDot
                    } />}
                        paginationStyle={{
                        bottom: 10
                    }}>
                        <View style={styles.slide}>
                            <Image style={styles.slideImage} source={BANNER_IMGS[0]} resizeMode="stretch"/>
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.slideImage} source={BANNER_IMGS[1]} resizeMode="stretch"/>
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.slideImage} source={BANNER_IMGS[2]} resizeMode="stretch"/>
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.slideImage} source={BANNER_IMGS[3]} resizeMode="stretch"/>
                        </View>
                    </Swiper>
                    <View
                        style={{
                        paddingTop: 10,
                        height: 60,
                        flexDirection: 'row',
                        backgroundColor: '#ffffff'
                    }}>
                        <View
                            style={{
                            width: item_width,
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>123,456,789</Text>
                            <Text
                                style={{
                                fontSize: 12,
                                color: '#cacaca',
                                marginTop: 5
                            }}>用户累计投资(元)</Text>
                        </View>
                        <Image
                            source={require('../imgs/home/ic_home_shu.png')}
                            style={{
                            height: 40
                        }}/>
                        <View
                            style={{
                            width: item_width,
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>123,456,789</Text>
                            <Text
                                style={{
                                fontSize: 12,
                                color: '#cacaca',
                                marginTop: 5
                            }}>用户累计赚取(元)</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 8
                    }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                            this.onPressItem(Invest.investList[0])
                        }}>
                            <View
                                style={{
                                flexWrap: 'wrap',
                                backgroundColor: 'white',
                                padding: 15
                            }}>
                                <View
                                    style={{
                                    marginTop: 5,
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Text
                                        style={{
                                        fontSize: 18
                                    }}>新手团</Text>
                                    <Text
                                        style={{
                                        fontSize: 12,
                                        color: '#ff8848',
                                        marginLeft: 10
                                    }}>新手专享|每日付息|多重保障</Text>
                                </View>
                                <View
                                    style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}>
                                    <View
                                        style={{
                                        flex: 1
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 32,
                                            color: 'red',
                                            marginTop: 5
                                        }}>12%</Text>
                                        <Text
                                            style={{
                                            fontSize: 12,
                                            color: '#808080',
                                            marginTop: 5
                                        }}>预期年化收益</Text>
                                    </View>
                                    <View style={styles.center_item_wrap}>
                                        <Text style={styles.center_item_tv}>立即投资</Text>
                                    </View>
                                </View>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                    <View
                        style={{
                        marginTop: 8,
                        backgroundColor: 'white'
                    }}>
                        <View
                            style={{
                            flexDirection: 'row'
                        }}>
                            <HomePageItem
                                title="新手指引"
                                content="三部进阶理财高手"
                                icon={CENTER_IMGS[0]}
                                onPress={() => {
                                this.centerItemAction(0)
                            }}/>
                            <Image
                                source={require('../imgs/home/ic_home_shu.png')}
                                style={{
                                height: 80
                            }}/>
                            <HomePageItem
                                title="平台数据"
                                content="安全可靠数据保障"
                                icon={CENTER_IMGS[1]}
                                onPress={() => {
                                this.centerItemAction(1)
                            }}/>
                        </View>
                        <ShortLine/>
                        <View
                            style={{
                            flexDirection: 'row'
                        }}>
                            <HomePageItem
                                title="团团赚"
                                content="明星产品，分散投资"
                                icon={CENTER_IMGS[2]}
                                onPress={() => {
                                this.centerItemAction(3)
                            }}/>
                            <Image
                                source={require('../imgs/home/ic_home_shu.png')}
                                style={{
                                height: 80
                            }}/>
                            <HomePageItem
                                title="邀请有礼"
                                content="邀请好友送红包"
                                icon={CENTER_IMGS[3]}
                                onPress={() => {
                                this.centerItemAction(2)
                            }}/>

                        </View>
                        <ShortLine/>
                        <View
                            style={{
                            flexDirection: 'row'
                        }}>
                            <HomePageItem
                                title="散标"
                                content="信用分级，信息透明"
                                icon={CENTER_IMGS[4]}
                                onPress={() => {
                                this.centerItemAction(2)
                            }}/>
                            <Image
                                source={require('../imgs/home/ic_home_shu.png')}
                                style={{
                                height: 80
                            }}/>
                            <HomePageItem
                                title="敬请期待"
                                content="更多活动敬请期待"
                                icon={CENTER_IMGS[5]}
                                onPress={() => {
                                this.centerItemAction(3)
                            }}/>
                        </View>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row'
                    }}>
                        <View
                            style={{
                            flex: 1,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            paddingTop: 10
                        }}>
                            <Image
                                style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5
                            }}
                                source={require('../imgs/home/bottom_1.png')}/>
                            <Text
                                style={{
                                color: '#515151',
                                fontSize: 12
                            }}>投资海量分散</Text>
                        </View>
                        <View
                            style={{
                            flex: 1,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            paddingTop: 10
                        }}>
                            <Image
                                style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5
                            }}
                                source={require('../imgs/home/bottom_2.png')}/>
                            <Text
                                style={{
                                color: '#515151',
                                fontSize: 12
                            }}>投资海量分散</Text>
                        </View>
                        <View
                            style={{
                            flex: 1,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            paddingTop: 10
                        }}>
                            <Image
                                style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5
                            }}
                                source={require('../imgs/home/bottom_3.png')}/>
                            <Text
                                style={{
                                color: '#515151',
                                fontSize: 12
                            }}>银行级风控人才</Text>
                        </View>

                    </View>
                    <TouchableWithoutFeedback>
                        <View
                            style={{
                            alignItems: 'center',
                            marginTop: 20,
                            marginBottom: 10
                        }}>
                            <Text
                                style={{
                                fontSize: 14,
                                color: '#389e7f'
                            }}>了解更多</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    center_item_wrap: {
        marginTop: 15,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 4,
        width: 190,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#389e7f'
    },
    center_item_tv: {
        fontSize: 18,
        color: '#ffffff'
    },
    page: {
        flex: 1,
        height: 200,
        width: width
    },
    slideImage: {
        width: width,
        height: 200
    },
    customDot: {
        backgroundColor: '#ccc',
        height: 6,
        width: 6,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 10,
        borderRadius: 3
    },

    customActiveDot: {
        backgroundColor: 'white',
        height: 6,
        width: 6,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 10,
        borderRadius: 3
    }
});
export default connect((state) => {
    const {Invest} = state;
    return {Invest}
})(Home);