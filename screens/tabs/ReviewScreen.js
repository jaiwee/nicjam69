import {View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens';
import { COLORS } from '../../constants';
import { Dropdown } from 'react-native-searchable-dropdown-kj'
import Ionicons from '@expo/vector-icons/Ionicons.js'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Rating } from 'react-native-ratings';

//  import firestore from "@react-native-firebase/firestore";

const ReviewScreen = () => {

    const navigation = useNavigation();
    const [reviewBody, setReviewBody] = useState('')
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [search, setSearch] = useState(null);
    const [searchList, setSearchList] = useState([]);


    useEffect(() => {
        getSearchList();
    }, []);

    const getSearchList = async() => {
        setSearchList([]);
        const q = query(collection(db, 'sellers'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setSearchList(prev => [...prev, doc.data()]);
        })
    }

    const renderItem = (item) => {
        return (
          <View style={styles.item}>
            {(
              <View style = {styles.listItem}>
                <Text style = {styles.listText}> {item.sellerName} </Text>
             </View> )}
           </View>
        );
    };

    return (
        <ImageBackground source = {require('../../review1.jpeg')} resizeMode="cover" style={styles.container}>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style={styles.headerText}>Leave</Text>
                    <Text style={styles.headerText}>A Review</Text>
                </View>

                <View style = {styles.sellerContainer}>
                    <Text style = {styles.reviewFields}> Choose a seller </Text>
                </View>
                <View style={styles.searchContainer}>
                    <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    renderRightIcon = {() => (
                        <View>
                            <Ionicons name="search" size={24} color = {'gray'}/>
                        </View>
                    )}
                    iconStyle={styles.iconStyle}
                    data={searchList}
                    search
                    maxHeight={300}
                    labelField="sellerName"
                    valueField="value"
                    placeholder={'Search for seller'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        handleDropDownItemPress(item);
                        setIsFocus(false);
                    }}
                    renderItem={renderItem}
                    />
                </View>

                <View style = {styles.reviewBodyContainer}>
                    <Text style = {styles.reviewFields}> Enter your review </Text>
                    <TextInput
                            placeholder = "Seller was patient and the bracelet is so cute :)"
                            value = {reviewBody}
                            onChangeText = {text => setReviewBody(text)}
                            style = {styles.input} 
                            multiline={true}
                        />
                </View>

                <View style = {styles.starContainer}>
                    <Text style = {styles.reviewFields}> Star Rating </Text>
                    <Rating
                                type = 'custom'
                                startingValue={1}
                                ratingCount = {5}
                                imageSize= {60}
                                // style={{justifyContent:'flex-start'}}
                                tintColor={COLORS.BLUE}
                                ratingColor = { '#f1c40f'}
                                style = {{marginRight: 3, marginLeft: 0}}
                                
                            />
                </View>

                <TouchableOpacity
                            onPress={() => {
                                handleLogin();
                            }}
                            style = {[styles.button]}
                        >
                            <Text
                                style = {styles.buttonText}
                            >
                                Submit Review
                            </Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: COLORS.BLUE
    },
    searchContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
      //   borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
        marginTop: 10
      },
    headerText: {
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 40
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 8,
        marginHorizontal: 13,
      //   borderWidth: 1,
        backgroundColor: '#e8e8e8'
      },
    headerContainer: {
        margin: 40,
        paddingTop: 10
    },
    starContainer: {
        marginHorizontal: 30,
        marginBottom: 30
    },
    reviewBodyContainer: {
        marginHorizontal: 30,
        paddingTop: 10,
        marginBottom: 10
    },
    sellerContainer: {
        marginHorizontal: 30,
    },
    reviewFields: {
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 20
    },
    image: {
        height: 300,
        width: 200
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 18,
        marginBottom: 12,
        borderRadius: 10,
        marginTop: 7,
        height: 200
    },
    button: {
        backgroundColor: '#6e0280',
        width: '85%',
        padding: 15,
        marginLeft: 30,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {   
        color: 'white',
        fontSize: 16,
        fontStyle: 'bold',
        fontFamily: 'HelveticaNeue-Bold'
    },
    
})
export default ReviewScreen;