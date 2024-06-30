import {View, Text, Image, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import CounterComponent from './CounterComponent';
import GalleryComponent from './GalleryComponent';


const ProfileHeaderComponent = ({config}) => {
  console.log("received by profile header")
  console.log(config.image);
  console.log(config.followers);
  console.log(config);

  const handleOpenURL = (tele) => {
    Linking.openURL(tele);
  };

  return (
    <View>
        <View style = {styles.profileFollowContainer}>
            <Image source = {{uri: config.image}} style = {styles.profileImage}/>
            <View style = {styles.statsContainer}>
              {config.followers && config.followers.length > 0 && 
              config.followers.map((item, index) => {
                return (<CounterComponent key = {index} counter = {item.counter} description = {item.desc} />)
              })}
            </View>
        </View>

        <View style = {styles.infoContainer}>
            <Text style = {styles.username}>@{config.username} </Text>
            <Text style={{color: '#1F41BB'}}
                  onPress={() => handleOpenURL(config.telegram)}> {config.telegram}
            </Text>
            <Text style = {styles.desc}> {config.bio} </Text>
        </View>

        <View style = {styles.actionContainer}>
          <TouchableOpacity style = {[styles.button, {backgroundColor: '#1F41BB'}]}>
              <Text style = {styles.btnText}> Follow </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {[styles.button, {backgroundColor: '#E8F0F2', borderWidth: 0.5}]}>
              <Text style = {[styles.btnText, {color: 'black'}]}> Message </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileFollowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  statsContainer: {
    flexDirection:'row',
    columnGap: 30
  },
  infoContainer: {
    marginTop: 16,
    rowGap: 4,
    marginHorizontal: 2,
  },
  username: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Helvetica-BoldOblique"
  },
  desc: {
    color: '4F8096',
    fontSize: 14
  },
  actionContainer: {
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 16

  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    color: 'white'
  }
})

export default ProfileHeaderComponent;