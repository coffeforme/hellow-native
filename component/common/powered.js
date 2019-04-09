import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export const Powered = () => {
    return (
        <Text style={styles.text}>Powered by Natural Code</Text>
    )
}


const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: '#FFF'
    }
});
