/**
 * Created by haifeng on 16/10/7.
 */
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    InteractionManager,
    StyleSheet,
    ScrollView
} from 'react-native';
import {NaviGoBack} from '../common/CommonUtils';

var {height, width} = Dimensions.get('window');
class NewsSingle extends Component {
    constructor(props) {
        super(props);
        this.buttonBackAction = this.buttonBackAction.bind(this);
        this.state = {}

    }

    buttonBackAction() {
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }

    render() {
        const {navigator, route} = this.props;
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
                <View style={{height:60,backgroundColor:'#3b3738',paddingTop:10,flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                                      style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                        <Image
                            style={{width:13,height:20}}
                            source={require('../imgs/ic_center_back.png')}
                        />
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>新闻</Text>
                    </View>
                    <View style={{width:48,height:48}}/>
                </View>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:26}}>{route.order.shopName}</Text>
                        <Image style={{width:width-20,height:200,marginTop:20}} source={route.order.icon}/>
                        <View >
                            <Text style={{marginTop:20,fontSize:14,lineHeight:20}}>{route.order.content}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({});
export default NewsSingle