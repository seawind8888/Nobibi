/**
 * Created by haifeng on 17/1/20.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    WebView,
    TouchableOpacity
} from 'react-native';

import {NaviGoBack} from '../common/CommonUtils';

let {height, width} = Dimensions.get('window');

class WebViewContainer extends Component {
    constructor(props) {
        super(props);
        this.buttonBackAction = this.buttonBackAction.bind(this);
        this.state = {}
    }

    buttonBackAction() {
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }

    componentWillMount() {
    }

    render() {
        const {route} = this.props;
        return (
            <View style={{flex:1}} >
                <View style={{height: 60, backgroundColor: '#389e7f', paddingTop: 10, flexDirection: 'row'}}>
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
                <View style={{flex:1}}>
                    <WebView
                        style={{flex: 1}}
                        source={{uri: route.news.post_source}}
                    >
                    </WebView>
                </View>
            </View>
        );
    }
}

export default WebViewContainer