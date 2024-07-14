import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const LikedPostsScreen = ({ route }) => {
  const { likedPosts } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Posts</Text>
      <FlatList
        data={likedPosts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  postContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LikedPostsScreen;
