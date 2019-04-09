import React, { Component } from 'react';

import {
    Text,
    TextInput,
    View,
    Alert,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';

const config = require('../../../../config')

import { styles } from '../../../common/styles/form.style'

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            loading: false,
            api: config.api + 'auth/login',
            user: '',
            pass: ''
        };
        this.login = this.login.bind(this);
    }

    login = async () => {
        if (config.isDebug) {
            AsyncStorage.setItem('userToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzM5MDVjODI4NDdmODAwMDRiY2VkZTkiLCJpYXQiOjE1NTAxMDk3NDAsImV4cCI6MTU1MTMxOTM0MH0.4iNyopeZoePAB2nrNTUxkWw6V4mDJJAFzzBIxfn-uhA');
            this.props.navigate('App');
            return;
        }

        if (this.state.user == '') {
            Alert.alert('Ingrese su usuario')
            return
        } else if (this.state.pass == '') {
            Alert.alert('Ingrese la contraseña')
            return
        }
        this.setState({ loading: true })
        fetch(this.state.api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: this.state.user,
                pass: this.state.pass
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res != null) {
                    Alert.alert(res.msg);
                    if ((res.token || null) != null) {

                        this.setState({
                            loading: false
                        });

                        AsyncStorage.setItem('userToken', res.token);
                        this.props.navigate('App');
                    } else {
                        this.setState({ loading: true })
                    }
                }
            });
    }

    // _signInAsync = async () => {
    //     await AsyncStorage.setItem('userToken', 'abc');
    //     this.props.navigation.navigate('App');
    // };

    _cleanResult() {
        this.setState({ result: null })
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Usuario"
                    onChangeText={(user) => this.setState({ user })}
                    style={styles.textInfo}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                />
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={(pass) => this.setState({ pass })}
                    style={styles.textInfo}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                />
                <TouchableHighlight onPress={this.login} disabled={this.state.loading}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar sesión!</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
