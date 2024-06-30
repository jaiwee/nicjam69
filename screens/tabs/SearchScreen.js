import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens';
import TrendingComponent from '../../components/TrendingComponent';
import HappeningComponent from '../../components/HappeningComponent';
import SearchBarComponent from '../../components/SearchBarComponent';
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
    <View style = {styles.container}>
        <SearchBarComponent/>
        <HappeningComponent/>
        <TrendingComponent/>
        <TouchableWithoutFeedback
            onPress={() => {
                console.log("pressed!");
                navigation.navigate(SCREENS.SELLERPROFILE);
        }}>
            <View
            style={{
                height: 50,
                backgroundColor: 'black',
                marginTop: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text
                style={{
                color: 'white',
                fontSize: 16,
                }}>
                @xxxx
            </Text>
            </View>
        </TouchableWithoutFeedback>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1F3FA"
    }
})
export default SearchScreen;