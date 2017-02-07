'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    Dimensions,
} from 'react-native';
import {NaviGoBack} from '../../utils/CommonUtils';

var {height, width} =  Dimensions.get('window');



class Prepaid extends Component {
    constructor(props) {
        super(props);
        this.buttonBackAction = this.buttonBackAction.bind(this);
        this.submitPay = this.submitPay.bind(this);
    }

    //返回
    buttonBackAction() {
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }

    //提交支付
    submitPay() {
        console.log('submitPay...');
    }

    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
            </View>
        );
    }
}
const styles = StyleSheet.create({

});

export default Prepaid;