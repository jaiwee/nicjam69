import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ProfileHeaderComponent from '../../components/ProfileHeaderComponent';
import GalleryComponent from '../../components/GalleryComponent';
import COLORS from '../../constants/colors';

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const getSellerStats = async () => {
    console.log("GETTING SELLER STATS")
    const sellersRef = collection(db, "sellers");
    const q = query(sellersRef, where("sellerName", "==", "plop"));

    const querySnapshot = await getDocs(q);

    const stats = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        stats.push(data)
      });

    return stats;
}

const SellerProfileScreen = () => {
    const [profile, setProfile] = useState(null);
    const [gallery, setGallery] = useState(null);
    useEffect( () => {
        const profileData = require('../../assets/mocks/users.json');
        console.log(profileData.image);
        setProfile(profileData);

        const gallery = require('../../assets/mocks/gallery.json');
        console.log(gallery);
        setGallery(gallery);
    }, [])

    return (
    <ScrollView scrollEnabled = {true} showsVerticalScrollIndicator = {false} style = {styles.container}>
        <TouchableOpacity onPress = {getSellerStats}> 
         <Text>CLICK MEEEE</Text> 
        </TouchableOpacity>
        <StatusBar barStyle = {'dark-content'}/>
        {profile && <ProfileHeaderComponent config = {profile}/>}

        {gallery && gallery.length > 0 &&
        <GalleryComponent gallery = {gallery}/>}
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 19,
        backgroundColor: COLORS.BLUE
    },
})

export default SellerProfileScreen;