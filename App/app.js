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

import Splash from './main/Ready';
import AppMain from './main/AppMain';
import {NaviGoBack} from './utils/CommonUtils';
export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19
var _navigator;
class rootApp extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.goBack = this.goBack.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
        /*registerApp('wx331c28ad7ffd35b0');*/
    }

    goBack() {
        return NaviGoBack(_navigator);
    }

    renderScene(route, navigator) {
        let Component = route.component;
        _navigator = navigator;
        return (
            <Component navigator={navigator} route={route}/>
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
                    style={styles.navigator}
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
let styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

export default rootApp;

