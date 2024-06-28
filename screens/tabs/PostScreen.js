import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDownloadURL, uploadBytes, ref, uploadBytesResumable} from 'firebase/storage';
import { addDoc, collection, onSnapshot} from 'firebase/firestore';
import { storage } from '../../firebaseConfig';

const PostScreen = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    setLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // const uploadURL = uploadImageAsync(result.assets[0].uri);
      // setImage(uploadURL);
      setInterval(() => {
        setLoading(false);
      }, 2000);
   } else {
      setImage(null);
      setInterval(() => {
        setLoading(false);
      }, 2000);
   }
  };

  const uploadImageAsync = async(uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      }
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  }

  //   async function uploadImage(uri, fileType) {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();

  //     const storageRef  = 
  //   }

  //   try {
  //     const storageRef = ref(storage, `postImages/image-${Date.now()})`);
  //     const result = await(uploadBytes(storageRef, blob));

  //     result.on("state_changed",
  //       (snapshot) => {
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         console.log("progress is " + progress)
  //       }


  //     )

  //     blob.close();
  //     return await getDownloadURL(storageRef);
  //   } catch(error) {
  //     alert(`Error: ${error}`)
  //   }
  // }

  return (
    <View style={styles.container}>

      {/* IMAGE PICKER COMPONENT */}
      {!image ? ( 
        <TouchableOpacity onPress={pickImage}> 
          {loading ? (
            <View style = {styles.one}> 
              <ActivityIndicator 
                color = {"#ff0000"}
                animating
                size  = {"large"}
              />
            </View>
        ) : (
            <Text style = {styles.text}>
              Pick an Image
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style = {styles.deleteButton}> 
            <Text style = {styles.deleteText}> Delete this image </Text>
          </TouchableOpacity>
        </>
      )}

      {/* TITLE COMPONENT */}
      <View style = {styles.headerContainer}>
        <TextInput 
          style = {styles.headerInput}
          placeholder='Give your post a title'
        />
      </View>

      {/* CAPTION COMPONENT */}
      <View style = {styles.captionContainer}>
        <TextInput 
          style = {styles.captionInput}
          multiline={true} 
          //  maybe convert to antd design
          placeholder='Give your post a caption'
        />
      </View>

      <View style = {styles.postContainer}>
        <TouchableOpacity style = {styles.postButton}>
          <Text style = {styles.postText}> Post </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C5EAFA'
  },
  headerContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    marginHorizontal: 40,
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  captionContainer: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    width: '80%',
    height: '40%',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  headerInput: {
    // backgroundColor: 'red',
    borderRadius: 20,
    height: 20,
    color: 'white'
  },
  image: {
    width: 200,
    height: 200,
    overflow: "hidden",
    marginTop: 22,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    margin:5
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    marginVertical: 5
  },
  postContainer: {
    flex: 1,
    width: '80%',
  },
  postButton: {
    borderRadius: 10,
    backgroundColor: 'purple',
    marginVertical: 10,
    // width: '80%',
    // height: '8%',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  postText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginVertical: 15
  }
});

export default PostScreen;