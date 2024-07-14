import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import BuyerPosts from './BuyerPosts';
import SellerPosts from './SellerPosts';
import SCREENS from '../screens.js';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
    return (
        <View style={{ flex: 1, paddingTop: 80, paddingHorizontal: 20 }}>
            <Button title="Matches" onPress={() => navigation.navigate('Matches')} />
            <View style={{ height: 20 }} />
            <Button title="Liked Posts" onPress={() => navigation.navigate(SCREENS.LIKED_POSTS)} />
            <View style={{ height: 20 }} />
            <Button title="Sign out" onPress={() => navigation.navigate(SCREENS.LOGIN)} />
        </View>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Buyers" component={BuyerPosts} />
            <Tab.Screen name="Sellers" component={SellerPosts} />
        </Tab.Navigator>
    );
};

const HomeTabs = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                    <Icon name="menu" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <TabNavigator />
        </View>
    );
};

const HomeScreen = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        marginRight: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default HomeScreen;
