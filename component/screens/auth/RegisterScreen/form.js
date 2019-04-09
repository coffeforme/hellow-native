import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Alert,
    TouchableHighlight,
    Button
} from 'react-native';


import { styles } from '../../../common/styles/form.style'

export class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            api: 'https://ranger-core.herokuapp.com/auth/register',
            result: null,
            user: '',
            email: '',
            pass: ''
        };
    }

    _callRegister() {
        if (this.state.user == '') {
            Alert.alert('Ingrese su usuario')
            return
        } else if (this.state.email == '') {
            Alert.alert('Ingrese un email')
            return
        }
        else if (this.state.pass == '') {
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
                email: this.state.email,
                pass: this.state.pass
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    loading: false,
                    result: res
                })
                Alert.alert(res.msg)
            });
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
                    placeholder="E-mail"
                    onChangeText={(email) => this.setState({ email })}
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
                <TouchableHighlight onPress={this._callRegister.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Registrar!</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

