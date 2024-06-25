import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const SearchBarComponent = ({}) => {

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
            console.log("works")
            console.log(doc.data());
            setSearchList(prev => [...prev, doc.data()]);
        })
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
        <View>
            <FlatList
                data = {searchList}
                key = {({item}) => item.value}
                renderItem = { ({item}) => {
                    return (
                        <View>
                            <Text> {item.sellerName} </Text>
                        </View>
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
        flexDirection: 'row'
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        padding: 10
    }
})

export default SearchBarComponent;