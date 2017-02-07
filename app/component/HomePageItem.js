/**
 * Created by haifeng on 17/2/7.
 */
import React, {Component} from 'react';

import{
    View,
    Alert,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

var {height, width} = Dimensions.get('window');
var item_width = (width - 1) / 2;

const HomePageItem = ({title, content, icon, onPress}) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.itemContainer}>
            <Image source={icon}
                   style={styles.itemIcon}/>
            <View style={{marginLeft: 10, marginTop: 5}}>
                <Text style={{fontSize: 16}}>{title}</Text>
                <Text style={styles.itemContent}>{content}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
);

let styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        width: item_width,
        marginTop: 25
    },
    itemIcon: {
        width: 40,
        height: 35,
        marginLeft: 20,
        marginTop: 3
    },
    itemContent:{
        color: '#999',
        fontSize: 12,
        marginTop: 5
    }
});

export default HomePageItem;


