import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, storage, auth } from '../../firebaseConfig';
import { KeyboardAvoidingView } from 'react-native';

const PostScreen = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [user, setUser] = useState({ email: '', username: '', profilePicture: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userEmail = currentUser.email;
        setUser(prevState => ({ ...prevState, email: userEmail }));
        
        // Fetch additional user details from Firestore
        const userDoc = await getDoc(doc(db, 'users', userEmail));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(prevState => ({
            ...prevState,
            username: userData.username || '',
            profilePicture: userData.profilePicture || ''
          }));
        }
      }
    };
    fetchUserProfile();
  }, []);

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!title || !desc || !image) {
      Alert.alert("Please fill in all fields and select an image");
      return;
    }

    try {
      const imageURL = await uploadMedia();
      const date = new Date();
      const newPost = {
        imageURL,
        title,
        caption: desc,
        date: date.toISOString(),
        username: user.username,
        profilePicture: user.profilePicture,
        likes: 0,
        liked: false
      };

      await addDoc(collection(db, 'posts'), newPost);  // Change 'posts' to 'buyerPosts'
      setTitle('');
      setDesc('');
      setImage(null);
      Alert.alert("Post submitted successfully!");
    } catch (error) {
      console.error("Error uploading post:", error);
      Alert.alert("Error uploading post", error.message);
    }
  };

  const uploadMedia = async () => {
    setLoading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = (e) => reject(new TypeError("Network request failed"));
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const fileRef = ref(storage, `postImages/${user.email}/${new Date().getTime()}`);
      const snapshot = await uploadBytes(fileRef, blob);

      blob.close();
      const downloadURL = await getDownloadURL(snapshot.ref);
      setLoading(false);
      return downloadURL;
    } catch (error) {
      setLoading(false);
      console.error("Error uploading media:", error);
      Alert.alert("Error uploading media", error.message);
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* IMAGE PICKER COMPONENT */}
      {!image ? (
        <TouchableOpacity style={styles.pickImage} onPress={pickImage}>
          {loading ? (
            <ActivityIndicator color="#ff0000" animating size="large" />
          ) : (
            <Text style={styles.text}>Pick an Image</Text>
          )}
        </TouchableOpacity>
      ) : (
        <>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.deleteButton} onPress={() => setImage(null)}>
            <Text style={styles.deleteText}>Delete this image</Text>
          </TouchableOpacity>
        </>
      )}

      {/* TITLE COMPONENT */}
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.headerInput}
          placeholder="Give your post a title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* CAPTION COMPONENT */}
      <View style={styles.captionContainer}>
        <TextInput
          style={styles.captionInput}
          placeholder="Give your post a caption"
          value={desc}
          onChangeText={setDesc}
          multiline
        />
      </View>

      <View style={styles.postContainer}>
        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F3FA',
    padding: 20,
  },
  headerContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    marginHorizontal: 40,
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  captionContainer: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    width: '90%',
    height: '38%',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  headerInput: {
    borderRadius: 20,
    height: 20,
    fontFamily: 'HelveticaNeue-Bold'
  },
  pickImage: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    marginTop: 22,
  },
  deleteText: {
    fontFamily: 'Helvetica-bold',
    color: 'red',
    fontWeight: 'bold',
    margin: 5,
  },
  deleteButton: {
    borderRadius: 5,
    marginVertical: 5,
  },
  postContainer: {
    flex: 1,
    width: '90%',
  },
  postButton: {
    borderRadius: 10,
    backgroundColor: 'black',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginVertical: 15,
  },
  text: {
    fontSize: 16,
  },
});

export default PostScreen;
