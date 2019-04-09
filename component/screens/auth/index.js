import {
    createBottomTabNavigator,
} from 'react-navigation';


import { LoginScreen } from './LoginScreen/index'
import { RegisterScreen } from './RegisterScreen/index'

const RootStack = createBottomTabNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: () => ({
                title: 'Ingresar',
            })
        },
        Register: {
            screen: RegisterScreen,
            navigationOptions: () => ({
                title: 'Registrar',
            })
        },
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                headerTitle: routeName
            };
        },
        tabBarOptions: {
            activeTintColor: '#DA3E12',
            labelStyle: {
                fontSize: 18,
            },
            style: {
                backgroundColor: 'black',
            },
        }
    }
);


export const AuthScreen = RootStack;