import {View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const HappeningComponent = ({}) => {

    const [happeningList, setHappeningList] = useState([]);

    useEffect(() => {
        getHappeningList();
    }, [])

    const getHappeningList = async() => {
        setHappeningList([]);
        const q = query(collection(db, 'events'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setHappeningList(prev => [...prev, doc.data()]);
        })
    }

  return (
    <View style = {styles.happeningContainer}>
      <Text style = {styles.headerText}> WHAT'S HAPPENING </Text>
      <FlatList
        style = {styles.flatListContainer}
        scrollEnabled = {false}
        showsHorizontalScrollIndicator = {false}
        data = {happeningList}
        horizontal = {true}
        renderItem = {({item, index}) => (
            <Image source = {{uri: item.imageURL}}
            style = {styles.happeningCard}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    flatListContainer: {
        paddingLeft: 20,
    },
    happeningCard: {
        width: 350,
        height: 160,
        borderRadius: 10,
        marginRight: 20
    },
    headerText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 20,
        marginBottom: 5
    }
})

export default HappeningComponent;