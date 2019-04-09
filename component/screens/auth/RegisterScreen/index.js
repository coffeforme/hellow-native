import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import { Logo } from '../../../common/logo'
import { Form } from './form'
import { Powered } from '../../../common/powered'

export class RegisterScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Logo style={styles.logo}></Logo>
                <Form style={styles.form}></Form>
                <Powered style={styles.powered}></Powered>
            </View >
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000'
    },
    logo: {
        flex: 3
    },
    form: {
        flex: 2
    },
    powered: {
        flex: 1
    }
});