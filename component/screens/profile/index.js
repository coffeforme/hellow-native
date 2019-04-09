import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Alert,
    TouchableHighlight,
    AsyncStorage,
    Picker
} from 'react-native';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

const config = require('../../../config')
import { styles } from '../../common/styles/form.style'

export class ProfileScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            loading: false,
            api: config.api + 'user/profile',
            userToken: '',
            isDateTimePickerVisible: false,
            date: ''
        };
        this.getprofile = this.getprofile.bind(this);
        this._handleDatePicked = this._handleDatePicked.bind(this);
        this._actualizar = this._actualizar.bind(this);
        this._omitir = this._omitir.bind(this);
        this._salir = this._salir.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem("userToken")
            .then(value => {
                this.setState({ "userToken": value });
                this.getprofile();
            })
            .done();
    }

    getprofile = () => {
        fetch(this.state.api, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': this.state.userToken
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res != null) {
                    if (res.profile == null)
                        Alert.alert("Crea tu perfil");

                }
            });
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (choosedate) => {
        this.setState({
            isDateTimePickerVisible: false,
            date: moment(choosedate).format('YY/MM/DD').toString()
        });
    };

    _omitir = () => {
        fetch(this.state.api + '/omitir', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': this.state.userToken
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    loading: false,
                    result: res
                })
                Alert.alert(res.msg)
            });
    };

    _actualizar = () => {

    };

    _salir = () => {
        AsyncStorage.setItem('userToken', '');
        this.props.navigate('Auth');
    }

    render() {


        return (
            <View style={styles.containerf}>
                <View style={styles.container}>
                    <Text style={styles.textInfo}>Hola</Text>
                    <Text style={styles.textInfo}>¡Bienvenido!</Text>
                    <Text style={styles.textInfo}>Para ser parte de #Ranger, debes completar una información basica</Text>
                    <TextInput
                        placeholder="Nombre"
                        onChangeText={(name) => this.setState({ name })}
                        style={styles.textInfo}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                    />
                    <TextInput
                        placeholder="Fecha nacimiento"
                        style={styles.textInfo}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        onFocus={this._showDateTimePicker}
                    >{this.state.date}</TextInput>
                    <TouchableHighlight onPress={this._actualizar} disabled={this.state.loading}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Actualizar</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._omitir} disabled={this.state.loading}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Omitir</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._salir} disabled={this.state.loading}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Omitir</Text>
                        </View>
                    </TouchableHighlight>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        mode={'date'}
                        is24Hour={false}
                    />
                    <Picker
                        placeholder="Genero"
                        selectedValue={this.state.language}
                        style={styles.button}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ genre: itemValue })
                        }>
                        <Picker.Item label="Masculino" value="male" style={styles.textInfo} />
                        <Picker.Item label="Femenino" value="female" style={styles.textInfo} />
                    </Picker>
                </View >
            </View>
        );
    }
}
