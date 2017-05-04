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
export const STATUS_BAR_HIDDEN = (Platform.OS === 'ios' ? false : true)
class rootApp extends React.Component {
    constructor(props) {
        super(props);
        // BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    renderScene(route, navigator) {
        let Component = route.component;
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
                    hidden={STATUS_BAR_HIDDEN}
                    backgroundColor='transparent'
                    style={{height: 0}}
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

