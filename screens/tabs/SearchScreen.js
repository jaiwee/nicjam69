import {View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens';
import TrendingComponent from '../../components/TrendingComponent';
import HappeningComponent from '../../components/HappeningComponent';
import SearchBarComponent from '../../components/SearchBarComponent';
import SearchComponent from '../../components/SearchComponent';
//  import firestore from "@react-native-firebase/firestore";

const SearchScreen = () => {

    const navigation = useNavigation();

    // useEffect(() => {
    //     const subscriber = firestore()
    //       .collection('Users')
    //       .onSnapshot(querySnapshot => {
    //         const users = [];
      
    //         querySnapshot.forEach(documentSnapshot => {
    //           users.push({
    //             ...documentSnapshot.data(),
    //             key: documentSnapshot.id,
    //           });
    //         });
      
    //         setUsers(users);
    //         setLoading(false);
    //       });
      
    //     // Unsubscribe from events when no longer in use
    //     return () => subscriber();
    //   }, []);

    return (
    <ScrollView style = {styles.container}>
        <SearchComponent/>
        <HappeningComponent/>
        <TrendingComponent/>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1F3FA"
    }
})
export default SearchScreen;