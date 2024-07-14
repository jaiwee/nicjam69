import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BuyerPosts from './BuyerPosts';
import SellerPosts from './SellerPosts';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Buyers" component={BuyerPosts} />
            <Tab.Screen name="Sellers" component={SellerPosts} />
        </Tab.Navigator>
    );
};

export default HomeScreen;
