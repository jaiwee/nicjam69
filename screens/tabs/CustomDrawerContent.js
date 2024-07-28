import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig'; // Adjust the path if necessary
import SCREENS from '../screens';

const CustomDrawerContent = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
      navigation.navigate(SCREENS.LOGIN);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <TouchableOpacity onPress={() => { console.log('Navigate to Matches'); navigation.navigate(SCREENS.MATCHES); }}>
        <Text style={styles.drawerItem}>Matches</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { console.log('Navigate to Liked Posts'); navigation.navigate(SCREENS.LIKED_POSTS); }}>
        <Text style={styles.drawerItem}>Liked Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut}>
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
