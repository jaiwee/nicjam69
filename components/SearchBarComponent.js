import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens/screens';

const SearchBarComponent = ({}) => {

    const [search, setSearch] = useState(null);
    const [searchList, setSearchList] = useState([]);

    const navigation = useNavigation();

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

    const onSellerPress = ({seller}) => {
        console.log("PRESSEDDDDDdddd ------------")
        console.log("THE SELLER IS" , seller);
        navigation.navigate(SCREENS.SELLERPROFILE, {seller: seller, test: 'hello!'});
    }

  return (
    <View>
        <View style = {styles.searchBarContainer}>
        {/* icon */}
        <TextInput
            style = {styles.inputText}
            placeholder = "Search by @ or product"
            onChangeText = {(val) => setSearch(val)}
        />
        </View>
        <View style = {styles.searchResultsContainer}>
            <FlatList
                data = {searchList}
                key = {({item}) => item.value}
                renderItem = { ({item}) => {
                    return (
                        <TouchableOpacity 
                            style = {styles.listItem}
                            onPress={() => onSellerPress({ seller: item })}>
                            <Text style = {styles.listText}> {item.sellerName} </Text>
                        </TouchableOpacity>
                    )
                }

                }
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: '#EBE9E9',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    searchResultsContainer: {
        height: 180,
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        padding: 10
    },
    listItem: {
        marginHorizontal:10,
        marginVertical: 2,
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    listText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    }
})

export default SearchBarComponent;