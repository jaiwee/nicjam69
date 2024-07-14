import React from 'react';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import SCREENS from '../screens';

const HomeTabs = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                    <Icon name="menu" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style = {{height : 30, borderRadius: 15, color: 'purple'}} onPress = {handleSignout}><Text> sign out </Text></TouchableOpacity>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
        </SafeAreaView>
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

export default HomeScreen;


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

