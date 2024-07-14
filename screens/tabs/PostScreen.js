import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDownloadURL, uploadBytes, ref, uploadBytesResumable} from 'firebase/storage';
import { addDoc, collection, onSnapshot, doc, setDoc} from 'firebase/firestore';
import { db, storage, auth } from '../../firebaseConfig';
import firebase from 'firebase/compat/app';
import { KeyboardAvoidingView } from 'react-native';


const PostScreen = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [user, setUser] = useState(null);
  const newPostRef = doc(collection(db, "posts"));
  const [display, setDisplay] = useState(null);

  useEffect( () => {
    console.log("title is", title);
    console.log("desc is", desc);
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userEmail = currentUser.email;
      console.log('Current user email:', userEmail);
      setUser(userEmail);
    } else {
      console.log('No user logged in');
    }
    console.log("display is ", display)
  }, [title, desc, display])


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

  const handleSubmit = async() => {

    try {
      const url = await uploadMedia();

      console.log(url);

      console.log("at handlsubmit, display is", display);
    
      if (title && desc && title.length > 0 && desc.length > 0 && url) {
        const date = new Date();
        const newPost = {
          imageURL: url,
          title: title,
          caption: desc,
          date: date
        }

        console.log("reached")

        try {
          await setDoc(newPostRef, newPost);
          console.log("posted")
        } catch (error) {
          console.error("issue with posting to firebase")
        }
      }
    } catch (error) {
      console.error("Issue with posting to Firebase:", error);
    }
  }

  const uploadMedia = async () => {
    setUploading(true)
    try {
      const {uri} = await FileSystem.getInfoAsync(image)
      console.log("REACHED HERE")
      console.log(uri);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      console.log("here now")
  
      // const filename = image.substring(image.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `postImages/${user}/${new Date().getTime()}`)
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await setDisplay(downloadURL)
      
      
      console.log("DOWNLOAD URL IS" , downloadURL)
      await console.log("HEREEE display IS" , display)

      return downloadURL;

      
      // await ref.put(blob)
      // setUploading(false)
      // Alert.alert("photo uploaded!")
      // setImage(null);
  
  
  
    } catch (error) {
      console.log('error')
      setUploading(false)
    }
  }

  


  return (
    <KeyboardAvoidingView style={styles.container}>
      {display ? (
        <Image
          source={{ uri: display }}
          style={{ width: 200, height: 200, resizeMode: 'cover' }}
        />
      ) : (
        <View> 
          <Text> nothing yet! </Text>
        </View>
      )}

      {/* IMAGE PICKER COMPONENT */}
      {!image ? ( 
        <TouchableOpacity style = {styles.pickImage} onPress={pickImage}> 
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
          onChangeText={(title) => setTitle(title)}
        />
      </View>

      {/* CAPTION COMPONENT */}
      <View style = {styles.captionContainer}>
        <TextInput 
          style = {styles.captionInput}
          // multiline={true} 
          //  maybe convert to antd design
          placeholder='Give your post a caption'
          onChangeText={(desc) => setDesc(desc)}
        />
      </View>

      <View style = {styles.postContainer}>
        <TouchableOpacity style = {styles.postButton} onPress={handleSubmit}> 
          <Text style = {styles.postText}> Post </Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

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
    // marginTop: 20,
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
    // backgroundColor: 'red',
    borderRadius: 20,
    height: 20,
    // color: 'white'
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
    overflow: "hidden",
    marginTop: 22,
  },
  deleteText: {
    fontFamily: 'Helvetica-bold',
    color: 'red',
    fontWeight: 'bold',
    margin: 5
  },
  deleteButton: {
    // backgroundColor: 'red',
    borderRadius: 5,
    marginVertical: 5
  },
  postContainer: {
    flex: 1,
    width: '90%',
  },
  postButton: {
    borderRadius: 10,
    backgroundColor: 'black',
    marginVertical: 10,
    // marginTop: 20,
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