import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import PostItem from '../../components/PostItem';

const BuyerPosts = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      { id: '1', uri: 'https://via.placeholder.com/150', title: 'Seller Post 1', liked: false, likes: 10, sellerProfilePicture: 'https://via.placeholder.com/50' },
      { id: '2', uri: 'https://via.placeholder.com/150', title: 'Seller Post 2', liked: false, likes: 7, sellerProfilePicture: 'https://via.placeholder.com/50' },
    ]);
  }, []);

  const handleProductPress = (product) => {
    console.log('Product pressed:', product);
    navigation.navigate('ProductDetail', { product });
  };

  const handleLikePress = (id) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const updatedLikes = product.liked ? product.likes - 1 : product.likes + 1;
        return { ...product, liked: !product.liked, likes: updatedLikes };
      }
      return product;
    }));
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <PostItem item={item} onPress={handleProductPress} onLikePress={handleLikePress} />
      )}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

export default BuyerPosts;

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
