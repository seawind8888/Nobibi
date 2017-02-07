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
  TouchableOpacity,
  ScrollView,
    TextInput,
} from 'react-native';

import { NaviGoBack } from '../utils/CommonUtils';
import ShortLineTwo from '../component/ShortLineTwo';
var {height, width} = Dimensions.get('window');

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }
  } 
  componentDidMount() {

  }
  
  render() {
    const {navigator,route} = this.props;
    return (
       <View style={{backgroundColor:'#f5f5f5',flex:1}}>
           <View style={{flex:1}}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                     <View style={{flexDirection:'row',height:60,backgroundColor:'white',alignItems:'center',marginTop:5}}>
                          <View style={{width:(width - 1) / 2,paddingLeft:10,flexDirection:'column'}}>
                              <Text style={{fontSize:18,color:'red'}}>10%</Text>
                              <Text style={{fontSize:12,marginTop:10}}>预期年化收益</Text>
                          </View>
                         <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:40}}/>
                         <View style={{width:(width - 1) / 2,paddingLeft:10,flexDirection:'column'}}>
                             <Text style={{fontSize:18,color:'black'}}>123,456,789</Text>
                             <Text style={{fontSize:12,marginTop:10}}>开放额度</Text>
                         </View>
                     </View>
                     <View style={{flexDirection:'column',height:80,alignItems:'flex-start',paddingLeft:10}}>
                         <Text style={{fontSize:12,marginTop:10}}>投资金额</Text>
                         <TextInput style={{height: 30,marginTop:10, width:width-20,borderColor: '#b1b1b1', backgroundColor:'#ffffff',borderWidth: 1}} />
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>总计¥5000</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14,color:'red'}}>总计¥5000</Text>
                           </View>
                     </View>
                </ScrollView>
           </View>
           <View style={{justifyContent:'flex-end'}}>
                <TouchableOpacity style={styles.item_layout}>
                       <Text style={{color:'red',fontSize:14}}>立即投资</Text>
                </TouchableOpacity>
           </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
   item_layout:{
        backgroundColor:'white',
        height:45,
        alignItems:'center',
        justifyContent:'center'
    },
    item_view_icon:{
        width:10,
        height:15,
    },
});
export default OrderDetails