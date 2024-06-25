import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ProfileHeaderComponent from '../../components/ProfileHeaderComponent';
import GalleryComponent from '../../components/GalleryComponent';

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
    <ScrollView scrollEnabled = {true} style = {styles.container}>
        <StatusBar barStyle = {'dark-content'}/>
        {profile && <ProfileHeaderComponent config = {profile}/>}

        {gallery && gallery.length > 0 &&
        <GalleryComponent gallery = {gallery}/>}
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        backgroundColor: 'white'
    },
})

export default SellerProfileScreen;