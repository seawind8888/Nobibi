/**
 * 购物车页面
 */
'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    InteractionManager,
    StyleSheet,
    ListView
} from 'react-native';
import WebViewContainer from './WebViewContainer';
import NewsSingle from './NewsSingle';
import {connect} from 'react-redux';
import {newsInit} from '../actions/newsAction';
import * as Progress from 'react-native-progress';
const ORDER_DATA = {
    "api": "GetOrderHistory",
    "v": "1.0",
    "code": "0",
    "msg": "success",
    "data": [{
        "id": 1,
        "shopName": "P2P网贷一出生就注定“禁止自融”",
        "icon": require('../imgs/news/news1.jpg'),
        "title": '12%',
        "time": "纵览《暂行办法》全文，诸多条文均印证、呼应了禁止自融这一规定。可以说禁止“自融”乃是网络借贷业务诸多基本原则所衍生出来的派生原则。...",
        "content":
            '《网络借贷信息中介机构业务活动管理暂行办法》第十条规定：“网络借贷信息中介机构不得从事或者接受委托从事下列活动：(一)为自身或变相为自身融资”。网贷平台的居间性质决定了禁止“自融”的监管政策，这一政策在《办法》实施前便是网络借贷行业监管的一条“铁律”。2014年4月，非法集资部际联席会议办公室主任刘张君表示，P2P要明确四条底线：“一是要明确这个平台的中介性质，二是要明确平台本身不得提供担保，三是不得归集资金搞资金池，四是不得非法吸收公众资金。” 此处，“明确这个平台的中介性质”即是指平台仅应作为信息中介机构，其本身不得为自己吸收资金。2015年7月18日，《关于促进互联网金融健康发展的指导意见》以国家政策的形式规定网络借贷信息中介机构不得“自融”。《关于促进互联网金融健康发展的指导意见》指出，个体网络借贷要坚持平台功能，为投资方和融资方提供信息交互、撮合、资信评估等中介服务。个体网络借贷机构要明确信息中介性质，主要为借贷双方的直接借贷提供信息服务，不得提供增信服务，不得非法集资。可见，网络借贷信息中介机构为自身或变相为自身融资将突破“中介”定位。网络借贷信息中介机构为自身融资应属禁止之列。《办法》颁布并生效后，网络借贷信息中介机构不得为自身或变相为自身融资成为正式的行政规章规则。《办法》以一个条文的篇幅明文规定了网络借贷信息中介机构不得为自身融资。但纵览《办法》全文，诸多条文均印证、呼应了这一禁止性规定。因此，可以说禁止“自融”乃是网络借贷业务诸多基本原则所衍生出来的派生原则。'
    }, {
        "id": 1,
        "shopName": "监管效应逐渐显现 投资人该如何挑选P2P平台？",
        "orderStauts": 0,
        "icon": require('../imgs/news/news2.jpg'),
        "title": '8%',
        "time": "新政出台后，优胜略汰的趋势将更加明显，两极分化逐渐严重。目前的形式条件下，小白该如何挑选P2P平台呢？...",
        "content":
            '　国庆将近结束，过去数年的经验，每逢国庆以后，几乎必有一定数量平台倒下，每年行业的冬天也即将到来。新政出台后，优胜略汰的趋势也将更加明显，好平台越做越好，经营状况差的平台短板将更突出，两极分化逐渐严重。那么在目前的形式条件下，对普通老百姓该如何挑选P2P平台呢?一、第一步要知道自己的风险承受能力P2P本身属于风险投资中的一种，虽然绝大多数平台承诺保本保息，但当平台的实力无法兜底时，很多时候会让投资人在单个平台中的本金血本无归。限制提现后，一般也只能发点白菜钱，也有一小部分良性退出的，但目前来说真正良性退出全部返还的依然是小概率事件，不具有广泛的代表性。个人的风险承受能力，可能就会跟人的年龄、家庭状况、财富多少等息息相关。切莫拿自己养老的钱、急用的钱、甚至是借来的钱投资P2P，因为这些风险过高，不适合普通老百姓操作。尽量用个人可支配的闲钱投资P2P，个人对闲钱的定义：即使全部赔完，也不会严重影响到个人及家庭生活。另外对大多数人来说可以用“投资100法则”，即P2P中的风险投资资产比例=(100-年龄) X 1%，这个是简单的公式，举个极端例子，如果您都超过100岁了，那就不能投资P2P了。根据个人家庭条件的不同情况，还可以在100法则基准线上做上下调整。要详细的测试个人风险承受能力，购买银行理财或在部分平台投资前会有简单的个人风险能力测试，这些功课投资人都有必要做。'
    }, {
        "id": 1,
        "shopName": "《暂行办法》后 P2P平台做了五大“变革”",
        "orderStauts": 0,
        "icon": require('../imgs/news/news3.jpg'),
        "title": '7%~12%',
        "time": "《暂行办法》发布已经一月有余，网贷平台发生了哪些改变？本文盘点P2P平台为向《暂行办法》靠拢做的五大改变革。... ",
        "content": '　(本文系作者授权发布首发作品，未经网贷之家允许，不得转载，违者必究)写在前面的话：改变，意味着是“首先吃螃蟹的平台”，数量少且具有代表性，在行业中属于先行者。笔者用这些平台来举例，并不是在打广告，如果把平台名马赛克掉，确实能减少笔者写软文的嫌疑，但是文章可读性会变差很多。所以，再次声明，这篇不是软文，写作属于个人爱好，请理性看待笔者的观点。自8月24日四部委联合发布《网络借贷信息中介机构业务活动管理暂行办法》已一个月有余。时间说长不长，说短不短。总的来说，P2P行业已经开始出现一些向《暂行办法》靠拢的改变。笔者将在本文盘点P2P平台在《暂行办法》发布后，已经做出的一些改变。一、风险备用金 VS质量保障服务无独有偶，宜人贷和拍拍贷在近期都将风险备用金改名为质量保障服务。风险备用金作为风险保障的方式之一，被大多数投资人接受。充足的风险备用金，已经成为平台一项很重要的“卖点”。既然风险备用金如此重要，为何要被改名为质量保障服务，可以来看看宜人贷的质量保障服务条款。(为什么笔者要拿宜人贷作为例子?那是因为，宜人贷没有完全下架掉风险备用金的信息，网站同时挂着风险备用金和质量保障服务条款，容易比较……)'
    }, {
        "id": 1,
        "shopName": "2017年P2P行业监管趋势猜想",
        "orderStauts": 0,
        "icon": require('../imgs/news/news4.jpg'),
        "title": '7%',
        "time": "笔者认为，在2017年，监管层规范平台风控业务模式，贯彻穿透式监管，或将成为P2P行业最重要的发展趋势。...",
        "content": '距监管办法颁布已过去一个多月，业内大佬们台面上忙着表态，私底下疯狂吐槽，场面太乱我都不敢看。不过可以确定，政策红利的时代过去了，想站在历史的废墟上指点江山没那么容易了；躺着赚钱、赚流量的时代过去了，想只吃肉不挨打没那么容易了；肆意“创新”的时代过去了，钻个漏洞就想安枕无忧也没那么容易了。一些人觉得监管办法过于苛刻，幻想事情还有转机，但张二认为，这只是一个开始，好戏还在后头。大家可以发现，监管办法中，相对空泛和现有技术难以落实的内容较多，对平台具体风控业务模式的规范内容较少。个人认为，在2017年，监管层规范平台风控业务模式，贯彻穿透式监管，或将成为P2P行业最重要的发展趋势。以下，张二结合P2P行业主流的四种模式，谈一谈对如何进一步规范行业发展的看法。居中商风险备用金模式采用这一模式的平台一般作为居间服务商存在，借款人提交借款申请，平台利用“线上+线下”的审核方式，审核通过后在平台发布借款信息，出借人根据披露的信息选择是否投资。目前，平台风险备用金的提取和偿付一般这样操作：每笔借款成交时，提取一定比例的金额放入“风险备用金”账户，项目出现逾期并超过规定的时限，平台根据规则，通过“风险备用金”账户向投资者垫付此笔借款的待收本金或本息收入，直到备用金枯竭为止。'
    }, {
        "id": 1,
        "shopName": "大手笔收购钱袋宝 美团“新常态”下的痛苦挣扎",
        "orderStauts": 0,
        "icon": require('../imgs/news/news5.jpg'),
        "title": '7%',
        "time": "美团全资收购第三方支付公司钱袋宝，有传言称，美团为此花了13亿元。... ",
        "content": '美团又双叒叕烧钱了。当然，美团天天都在烧钱，而这次是一个非常规的烧钱动作——全资收购第三方支付公司钱袋宝。业界意料之中，再次没有公布收购金额，和几个月前华润投资美团的估值一样，成了商业机密。这个情况本身就说明价格不菲。更深层次地看，这反映出美团缺乏创新的商业模式，在互联网业新常态下，若想要更进一步，甚至维持生存，都得非常挣扎。虽然美团不公布收购金额，但参考公布的同类案例可以猜个八九不离十：万达20亿元拿下快钱51%的股份，小米6亿元收购捷付睿通，恒大5.7亿元收购集付通，钱袋宝应该在同一水平，考虑到全资收购，报价应该更高，甚至有传言称，美团为此花了13亿元。'
    }]
};
var {height, width} = Dimensions.get('window');
class Find extends Component {
    constructor(props) {
        super(props);
        this.onPressItem = this.onPressItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            orders: ORDER_DATA.data
        }

    }

    componentDidMount() {
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(newsInit())
    }

    onPressItem(news) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: WebViewContainer,
                name: 'WebViewContainer',
                news
            });
        });
    }

    renderContent(dataSource) {
        console.log(dataSource);
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
                style={{backgroundColor:'#f5f5f5',flex:1}}
                onEndReachedThreshold={10}
                enableEmptySections={true}
            />
        );
    }

    renderItem(news,rowID) {
        let iconUrl = JSON.parse(news.smeta);
        return (
            <View>
                <View style={styles.item_view_zhanwei}></View>
                <TouchableWithoutFeedback onPress={()=>{this.onPressItem(news)}}>
                    <View style={{backgroundColor:'#ffffff'}}>
                        <View style={styles.item_view_center}>
                            <Text style={{color:'black',fontSize:16}}>{news.post_title}</Text>
                        </View>
                        <View style={styles.item_view_center_msg}>
                            <View style={styles.item_view_center_title_img}>
                                <Image source={{uri:iconUrl.thumb}} style={styles.item_view_center_title}/>
                                <View style={{width:width-95,marginLeft:10}}>
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
        console.log(News);
        return (
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <View style={{height:60,backgroundColor:'#3b3738',flexDirection:'row',paddingTop:10}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>发现</Text>
                    </View>
                </View>
                { News.isLoading ?
                    <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                        <Progress.Circle size={40} indeterminate={true}/>
                    </View>
                    :
                    <View style={{flex:1}}>
                        {/*{this.renderContent(this.state.dataSource.cloneWithRows(*/}
                            {/*this.state.orders === undefined ? [] : this.state.orders))}*/}
                        {this.renderContent(this.state.dataSource.cloneWithRows(News.news))}
                    </View>
                }
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
        fontSize: 13,
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
    return {
        News
    }
})(Find);
// export default connect((state) => {
//     console.log(state);
//     return {
//         news: state.news
//     }
// })(Find);