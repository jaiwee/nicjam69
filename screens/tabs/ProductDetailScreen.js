import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageURL }} style={styles.image} />
      <Text style={styles.productName}>{product.productName}</Text>
      <Text style={styles.productDesc}>{product.productDesc}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.sellerName}>Seller: {product.sellerName}</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productDesc: {
    fontSize: 16,
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  sellerName: {
    fontSize: 16,
    color: '#888',
    marginVertical: 8,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProductDetailScreen;
