import {View, Text, Image, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import CounterComponent from './CounterComponent';


const ProfileHeaderComponent = ({config}) => {
  console.log(config.imageURL);
  console.log(config.followerCount);
  console.log(config);

  const handleOpenURL = (tele) => {
    Linking.openURL(tele);
  };

  return (
    <View>
        <View style = {styles.profileFollowContainer}>
            <Image source = {{uri: config.imageURL}} style = {styles.profileImage}/>
            <View style = {styles.statsContainer}>
              <CounterComponent counter = {config.followerCount} description = {"followers"} />
              <CounterComponent counter = {config.productsSold} description = {"sold"} />
              <CounterComponent counter = {config.rating} description = {"rating"} />
            </View>
        </View>

        <View style = {styles.infoContainer}>
            <Text style = {styles.username}>@{config.sellerName} </Text>
            <Text style={{color: '#1F41BB'}}
                  onPress={() => handleOpenURL(config.telegramLink)}> {config.telegramLink}
            </Text>
            <Text style = {styles.desc}> {config.bio} </Text>
        </View>

        <View style = {styles.actionContainer}>
          <TouchableOpacity style = {[styles.button, {backgroundColor: '#1F41BB'}]}>
              <Text style = {styles.btnText}> Follow </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.button, {backgroundColor: 'purple'}]}>
              <Text style = {[styles.btnText, {fontFamily: 'Helvetica-bold'}]}> TNCs </Text>
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
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    color: 'white'
  }
})

export default ProfileHeaderComponent;