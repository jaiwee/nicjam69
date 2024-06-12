import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Image} from 'react-native';

import SCREENS from '../screens/screens.js';
// import IMAGES from '../images/index.js';
// import {COLORS} from '../constants';

import LoginScreen from '../screens/auth/LoginScreen';
// import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/tabs/HomeScreen';
import IMAGES from '../images/index.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={SCREENS.LOGIN}>
            <Stack.Screen
                name={SCREENS.LOGIN}
                component={LoginScreen}
                options={{headerShown: false}}
            />
            {/* <Stack.Screen
                name={SCREENS.SIGNUP}
                component={SignupScreen}
                options={{headerShown: false}}
            /> */}
            <Stack.Screen
                name={SCREENS.HOME}
                component={TabNavigator}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={SCREENS.HOME}
                component={HomeScreen}
                options={{
                title: 'Home',
                tabBarIcon: ({focused}) => (
                    <Image
                    source={IMAGES.HOME}
                    style={{
                        height: 30,
                        width: 30,
                        tintColor: focused ? 'red' : 'black',
                    }}
                    />
                ),
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'black',
                }}
            />
        </Tab.Navigator>
    )
}

export default StackNavigation;