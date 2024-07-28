import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Posts from './Posts'; // Adjust the import path as needed
import SCREENS from '../screens';
import CustomDrawerContent from './CustomDrawerContent';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Buyers">
        {() => <Posts collectionName="posts" />}
      </Tab.Screen>
      <Tab.Screen name="Sellers">
        {() => <Posts collectionName="sellerPosts" />}
      </Tab.Screen>
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
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerItem: {
    fontSize: 18,
    padding: 10,
  },
});

export default HomeScreen;
