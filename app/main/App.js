//根据页面
'use strict';

import React from 'react';
import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,
    View,
    Platform
} from 'react-native';

import Splash from './Ready';
import AppMain from './AppMain';
import {NaviGoBack} from '../utils/CommonUtils';
export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 0)
var _navigator;
class rootApp extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.goBack = this.goBack.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    goBack() {
        return NaviGoBack(_navigator);
    }

    renderScene(route, navigator) {
        let Component = route.component;
        _navigator = navigator;
        return (
            <Component navigator={navigator} route={route} {...route.passProps}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='transparent'
                    style={{height: STATUS_BAR_HEIGHT}}
                />
                <Navigator
                    ref='navigator'
                    style={{flex: 1}}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute={{
                        component: AppMain,
                        name: 'AppMain'
                    }}
                />
            </View>
        );
    }
}

export default rootApp;

