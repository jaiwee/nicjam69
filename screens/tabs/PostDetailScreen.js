import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PostDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: post.imageURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: post.profilePicture || 'https://via.placeholder.com/50' }} style={styles.profileImage} />
          <Text style={styles.username}>{post.username}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  followButton: {
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  caption: {
    fontSize: 16,
    color: '#333',
  },
});

export default PostDetailScreen;
