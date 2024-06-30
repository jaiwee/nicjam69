import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

import SCREENS from '../screens/screens.js';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/tabs/HomeScreen';
import SearchScreen from '../screens/tabs/SearchScreen';
import PostScreen from '../screens/tabs/PostScreen';
import DateScreen from '../screens/tabs/DateScreen';
import ProductDetailScreen from '../screens/tabs/ProductDetailScreen'; // Import ProductDetailScreen
import IMAGES from '../images/index.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={SCREENS.LOGIN}>
            <Stack.Screen
                name={SCREENS.LOGIN}
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={SCREENS.HOME}
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={SCREENS.PRODUCT_DETAIL}
                component={ProductDetailScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={SCREENS.HOME}
                component={HomeScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
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
            <Tab.Screen
                name={SCREENS.SEARCH}
                component={SearchScreen}
                options={{
                    title: 'Search',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={IMAGES.SEARCH}
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
            <Tab.Screen
                name={SCREENS.POST}
                component={PostScreen}
                options={{
                    title: 'Post',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={IMAGES.POST}
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
            <Tab.Screen
                name={SCREENS.DATE}
                component={DateScreen}
                options={{
                    title: 'Date',
                    tabBarIcon: ({ focused }) => (
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
    );
};

export default StackNavigation;
