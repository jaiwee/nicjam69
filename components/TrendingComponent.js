import {View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const TrendingComponent = ({}) => {

    const [trendingList, setTrendingList] = useState([]);

    useEffect(() => {
        getTrendingList();
    }, []);
    
    const getTrendingList = async() => {
        setTrendingList([]);
        const q = query(collection(db, 'trending'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setTrendingList(prev => [...prev, doc.data()]);
        })
    }

  return (
    <View style = {styles.trendingContainer}>
      <Text style = {styles.headerText}> WHAT'S HOT </Text>
      <FlatList
        style = {styles.flatListContainer}
        showsHorizontalScrollIndicator = {false}
        data = {trendingList}
        horizontal = {true}
        renderItem = {({item, index}) => (
            <Image source = {{uri: item.imageURL}}
            style = {styles.trendingCard}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    flatListContainer: {
        paddingLeft: 20,
    },
    trendingCard: {
        width: 200,
        height: 160,
        borderRadius: 15,
        marginRight: 20
    },
    headerText: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 20,
        marginBottom: 5
    }
})

export default TrendingComponent;