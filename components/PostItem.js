import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PostItem = ({ item, onPress, onLikePress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Image source={{ uri: item.sellerProfilePicture }} style={styles.profileImage} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.likeContainer}>
            <TouchableOpacity onPress={() => onLikePress(item.id)} style={styles.likeButtonContainer}>
              <Text style={[styles.likeButton, item.liked ? styles.liked : null]}>
                {item.liked ? '♥' : '♡'}
              </Text>
              <Text style={styles.likesCount}>{item.likes}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap', // Allow text to wrap if it's too long
  },
  likeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  likeButtonContainer: {
    alignItems: 'center',
  },
  likeButton: {
    fontSize: 24,
    padding: 5,
    color: '#888',
    marginBottom: -5,
  },
  liked: {
    color: 'red',
  },
  likesCount: {
    fontSize: 14,
    color: '#888',
  },
});

export default PostItem;
