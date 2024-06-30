import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Image} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons.js'
import FontAwesome from '@expo/vector-icons/FontAwesome.js'
import EvilIcons from '@expo/vector-icons/EvilIcons.js'


import SCREENS from '../screens/screens.js';
// import IMAGES from '../images/index.js';
// import {COLORS} from '../constants';

import LoginScreen from '../screens/auth/LoginScreen';
// import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/tabs/HomeScreen';
import SearchScreen from '../screens/tabs/SearchScreen';
import PostScreen from '../screens/tabs/PostScreen';
import IMAGES from '../images/index.js';
import DateScreen from '../screens/tabs/DateScreen.js';
import SellerProfileScreen from '../screens/search/SellerProfileScreen.js';


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
            <Stack.Screen
                name={SCREENS.SELLERPROFILE}
                component={SellerProfileScreen}
                options={{headerShown: true}}
            />
        </Stack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            activeTintColor: '#ffffff',
        }} >
            <Tab.Screen
                name={SCREENS.HOME}
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarActiveTintColor: 'red',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={28} color= {color} />
                    ),
                }}
            />
            <Tab.Screen
                name={SCREENS.SEARCH}
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarActiveTintColor: 'red',
                    tabBarIcon: ({ color, size }) => (
                        <EvilIcons name="search" size={35} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={SCREENS.POST}
                component={PostScreen}
                options={{
                    tabBarLabel: 'Post',
                    tabBarActiveTintColor: 'red',
                    tabBarIcon: ({ color, size }) => (
                        <EvilIcons name="plus" size={35} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={SCREENS.DATE}
                component={DateScreen}
                options={{
                title: 'Date',
                tabBarIcon: ({focused}) => (
                    <Image
                    source={IMAGES.DATE}
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