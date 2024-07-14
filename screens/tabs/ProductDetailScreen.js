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

  const handleProfilePress = () => {
    navigation.navigate('SellerProfile', { sellerId: product.sellerId });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.uri }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{'Lorem ipsum dolor sit amet. Et suscipit distinctio non nihil autem sit neque quasi. Aut exercitationem officiis est rerum cupiditate aut dicta aliquid est soluta natus qui totam autem hic minus quas.'}</Text>
      <View style={styles.followContainer}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={styles.profileImage} />
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
