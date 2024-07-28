import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Posts = ({ collectionName }) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Fetching posts from collection:", collectionName); // Debugging line
    const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Fetched post data:", data); // Debugging line
        return {
          id: doc.id,
          ...data,
          likes: data.likes || 0,
          liked: data.liked || false,
        };
      });
      setPosts(fetchedPosts);
    });
    return unsubscribe;
  }, [collectionName]);

  const handleLikePress = async (postId, currentLikes, isLiked) => {
    const postRef = doc(db, collectionName, postId);
    const newLikesCount = isLiked ? currentLikes - 1 : currentLikes + 1;
    await updateDoc(postRef, { likes: newLikesCount, liked: !isLiked });
  };

  const handlePostPress = (item) => {
    navigation.navigate('PostDetail', { post: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePostPress(item)} style={styles.postContainer}>
      <Image source={{ uri: item.imageURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.profileLikeContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: item.profilePicture || 'https://via.placeholder.com/50' }} style={styles.profileImage} />
            <Text style={styles.username}>{item.username}</Text>
          </View>
          <View style={styles.likeContainer}>
            <TouchableOpacity onPress={() => handleLikePress(item.id, item.likes, item.liked)}>
              <Icon name={item.liked ? "heart" : "heart-outline"} size={24} color={item.liked ? "pink" : "#888"} />
            </TouchableOpacity>
            <Text style={styles.likes}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (posts.length === 0) {
    return (
      <View style={styles.noPostsContainer}>
        <Text style={styles.noPostsText}>No posts available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2, // for shadow
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 8,
  },
  profileLikeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#888',
  },
  likeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  likes: {
    marginTop: 4,
    fontSize: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  list: {
    paddingHorizontal: 8,
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostsText: {
    fontSize: 18,
    color: '#888',
  },
});

export default Posts;
