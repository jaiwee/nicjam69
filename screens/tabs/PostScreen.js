import {View, Text, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, { useState } from 'react';
import UploadMediaComponent from '../../components/UploadMediaComponent';

const PostScreen = () => {

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const pickImage = () => {}

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

export default PostScreen;
