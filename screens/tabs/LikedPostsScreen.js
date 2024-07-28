import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const LikedPostsScreen = ({ route }) => {
  const { likedPosts } = route.params || [];

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.imageURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.productName}</Text>
        <Text style={styles.description}>{item.productDesc}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.seller}>{item.sellerName}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {likedPosts.length > 0 ? (
        <FlatList
          data={likedPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text>No liked posts yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  seller: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  list: {
    paddingBottom: 16,
  },
});

export default LikedPostsScreen;
