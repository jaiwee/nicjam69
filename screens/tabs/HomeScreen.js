import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import BuyerPosts from './BuyerPosts';
import SellerPosts from './SellerPosts';
import SCREENS from '../screens.js';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.MATCHES)}>
        <Text style={styles.drawerItem}>Matches</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LIKED_POSTS)}>
        <Text style={styles.drawerItem}>Liked Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LOGIN)}>
        <Text style={styles.drawerItem}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.REVIEW)}>
        <Text style={styles.drawerItem}>Leave A Review</Text>
      </TouchableOpacity>
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

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeTabs" component={TabNavigator} options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
        ),
      }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 15,
  },
  drawerItem: {
    fontSize: 18,
    padding: 10,
  },
});

export default HomeScreen;