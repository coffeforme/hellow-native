import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

const Logo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image
                source={require('../../content/images/logo.gif')}
                style={styles.strech}
            />
        </View>
    )
}


var screen = Dimensions.get('window')
const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },
    strech: {
        width: 600,
        height: 500
    }
});

export { Logo };