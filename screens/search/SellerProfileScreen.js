import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import ProfileHeaderComponent from '../../components/ProfileHeaderComponent';
import GalleryComponent from '../../components/GalleryComponent';
import COLORS from '../../constants/colors';

import { collection, getCountFromServer, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const ratingValues = {
    5: 100,
    4: 200,
    3: 300,
    2: 1000,
    1: 400,
  };
  

const getSellerStats = async () => {
    // console.log("GETTING SELLER STATS")
    const sellersRef = collection(db, "sellers");
    const q = query(sellersRef, where("sellerName", "==", "plop"));

    const querySnapshot = await getDocs(q);

    const stats = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        stats.push(data)
      });

    return stats;
}

const getSellerProducts = async (seller) => {
    // console.log("GETTING SELLER PRODUCTS")
    // console.log("SELLER IS ", seller)
    const sellersRef = collection(db, "products");
    const q = query(sellersRef, where("sellerName", "==", seller));

    const querySnapshot = await getDocs(q);

    const prods = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        prods.push(data)
      });

    // console.log(prods)
    return prods;
}

const getSellerReviews = async (seller) => {
    // console.log("GETTING SELLER REVIEWS")
    // console.log("SELLER IS ", seller)
    const sellersRef = collection(db, "reviews");
    const q = query(sellersRef, where("sellerName", "==", seller));

    const querySnapshot = await getDocs(q);

    const revs = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        revs.push(data)
      });

    // console.log(revs)
    return revs;
}

const getReviewSummary = async (seller) => {
    const counts = {};

    // Iterate over each rating value and fetch count from Firebase
    for (let rating in ratingValues) {
      const q = query(
        collection(db, "reviews"),
        where('rating', '==', parseInt(rating)),
        where('sellerName', '==', seller)
      );
  
      const snapshot = await getDocs(q);
      counts[rating] = snapshot.size; // Use snapshot.size to get the count of documents
  
      console.log(`Count of ${rating} star reviews:`, counts[rating]);
    }
  
    return counts;
}

const SellerProfileScreen = ({route}) => {
    const [profile, setProfile] = useState(null);
    const [gallery, setGallery] = useState(null);
    const [prods, setProds] = useState([]); 
    const [reviewSummary, setRevSummary] = useState([]);
    const [revs, setRevs] = useState([]); 
    const {seller, test} = route.params;

    // console.log(test);
    // console.log(seller);

    useEffect( () => {
        const profileData = seller;
        setProfile(profileData);

        // const gallery = require('../../assets/mocks/gallery.json');
        // console.log(gallery);
        // setGallery(gallery);
        handleGetSellerProducts();
        handleGetSellerReviews();
        handleGetReviewSummary();
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

      const handleGetSellerReviews = () => {
        getSellerReviews(seller.sellerName)
          .then(reviews => {
            // Handle reviews data as needed
            console.log("reviews:", reviews);
            setRevs(reviews);
          })
          .catch(error => {
            console.error("Error fetching seller products:", error);
          });
      };


      const handleGetReviewSummary = () => {
        getReviewSummary(seller.sellerName)
          .then(reviewSummary => {
            // Handle reviews data as needed
            setRevSummary(reviewSummary);
            console.log("reviewSummary:", reviewSummary);
          })
          .catch(error => {
            console.error("Error fetching seller products:", error);
          });
      };


    return (
    <ScrollView scrollEnabled = {true} showsVerticalScrollIndicator = {false} style = {styles.container}>
        <StatusBar barStyle = {'dark-content'}/>
        {profile && <ProfileHeaderComponent config = {profile}/>}

        {prods && prods.length > 0 &&
        <GalleryComponent gallery = {prods} reviews = {revs} reviewSummary = {reviewSummary}/>}
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