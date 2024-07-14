// screens/tabs/ProductDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [followed, setFollowed] = useState(false);
  const navigation = useNavigation();

  const handleFollowPress = () => {
    setFollowed(!followed);
  };

  const handleSellerProfilePress = () => {
    navigation.navigate('SellerProfile', { sellerId: product.sellerId });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.followContainer}>
        <TouchableOpacity onPress={handleSellerProfilePress}>
          <Image source={{ uri: product.sellerProfilePicture }} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFollowPress} style={[styles.followButton, followed ? styles.followed : null]}>
          <Text style={styles.followButtonText}>{followed ? 'Following' : 'Follow'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  followContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  followButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#1E90FF',
  },
  followed: {
    backgroundColor: '#87CEEB',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
