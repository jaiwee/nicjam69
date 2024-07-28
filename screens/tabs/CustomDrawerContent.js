import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SCREENS from '../screens';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <TouchableOpacity onPress={() => { console.log('Navigate to Matches'); navigation.navigate(SCREENS.MATCHES); }}>
        <Text style={styles.drawerItem}>Matches</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { console.log('Navigate to Liked Posts'); navigation.navigate(SCREENS.LIKED_POSTS); }}>
        <Text style={styles.drawerItem}>Liked Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { console.log('Navigate to Leave a Review'); navigation.navigate('Review'); }}>
        <Text style={styles.drawerItem}>Leave a Review</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { console.log('Navigate to Sign Out'); navigation.navigate(SCREENS.LOGIN); }}>
        <Text style={styles.drawerItem}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    fontSize: 18,
    padding: 10,
  },
});

export default CustomDrawerContent;
