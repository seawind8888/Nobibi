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
                <View style={{height: 60, backgroundColor: '#3b3738', flexDirection: 'row', paddingTop: 10}}>
                    <TouchableOpacity onPress={() => {
                        this.buttonBackAction()
                    }} style={{width: 48, height: 48, alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            style={{width: 13, height: 20}}
                            source={require('../../imgs/ic_center_back.png')}
                        />
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, color: 'white', alignSelf: 'center'}}>充值</Text>
                    </View>
                    <View style={{width: 48, height: 48}}/>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={{fontSize: 14, marginTop: 10}}>可用余额（元）：0.00</Text>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder='输入投资金额'
                        placeholderTextColor="#aaaaaa"/>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={{fontSize: 14, marginTop: 10}}>选择充值方式</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 15
    },
    inputContainer: {
        height: 45,
        marginTop: 10,
        width: width - 30,
        borderColor: '#b1b1b1',
        paddingLeft: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1
    }
});

export default Prepaid;