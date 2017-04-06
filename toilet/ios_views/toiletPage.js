/**
 * Created by wanny-n1 on 2017/4/5.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

class ToiletPage extends Component {
    render() {
        return (
            <View>
                <Text style={styles.text}>卫生间</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    text: {fontSize: 60}
})

module.exports = ToiletPage;