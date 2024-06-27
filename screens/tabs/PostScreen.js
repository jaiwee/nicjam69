import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from 'react-native-safe-area-context';

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
          <TouchableOpacity> 
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
    marginVertical: 20,
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
    height: '50%',
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
  },
  deleteText: {
    color: 'blue'
  }
});

export default PostScreen;