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

const getSellerProducts = async (seller) => {
    console.log("GETTING SELLER PRODUCTS")
    console.log("SELLER IS ", seller)
    const sellersRef = collection(db, "products");
    const q = query(sellersRef, where("sellerName", "==", seller));

    const querySnapshot = await getDocs(q);

    const prods = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        prods.push(data)
      });

    console.log(prods)
    return prods;
}

const SellerProfileScreen = ({route}) => {
    const [profile, setProfile] = useState(null);
    const [gallery, setGallery] = useState(null);
    const [prods, setProds] = useState([]); 
    const {seller, test} = route.params;

    console.log(test);
    console.log(seller);

    useEffect( () => {
        const profileData = seller;
        setProfile(profileData);

        // const gallery = require('../../assets/mocks/gallery.json');
        // console.log(gallery);
        // setGallery(gallery);
        handleGetSellerProducts();
    }, [])

    const handleGetSellerProducts = () => {
        getSellerProducts(seller.sellerName)
          .then(products => {
            // Handle products data as needed
            console.log("Products:", products);
            setProds(products);
          })
          .catch(error => {
            console.error("Error fetching seller products:", error);
          });
      };

    return (
    <ScrollView scrollEnabled = {true} showsVerticalScrollIndicator = {false} style = {styles.container}>
        <TouchableOpacity onPress = {handleGetSellerProducts}> 
         <Text>CLICK MEEEE</Text> 
        </TouchableOpacity>
        <StatusBar barStyle = {'dark-content'}/>
        {profile && <ProfileHeaderComponent config = {profile}/>}

        {prods && prods.length > 0 &&
        <GalleryComponent gallery = {prods}/>}
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