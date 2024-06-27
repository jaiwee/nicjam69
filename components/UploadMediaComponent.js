import {View, Alert, Image, Text, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, { useState } from 'react';
import * as FileSystem from "expo-file-system";

const UploadMediaComponent = () => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    })

    if (!result.canceled){
        setImage(result.assets[0].uri)
    }
  }

  const uploadMedia = async () => {
    setUploading(true);
  }

//   try {
//     const {uri} = await FileSystem.getInfoAsync(image);
//   }

  return (
    <SafeAreaView>
      <Text> Postyyy </Text>
      <UploadMediaComponent/>
      {! image ? <> 
      {/* to pick and image section*/}
        <TouchableOpacity>
          <Text> Pick an image </Text>
        </TouchableOpacity>
      </> : <> 
      {/* to display image section */}
      </>}
      <TextInput> Add a catchy headline </TextInput>
      <TextInput> Add a caption </TextInput>
      {/* <Post Button Component> */}

    </SafeAreaView>
  );
};

export default UploadMediaComponent;