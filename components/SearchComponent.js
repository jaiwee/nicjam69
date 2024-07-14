import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens/screens';
import { Dropdown } from 'react-native-searchable-dropdown-kj'
import Icon from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons.js'
import FontAwesome from '@expo/vector-icons/FontAwesome.js'
import EvilIcons from '@expo/vector-icons/EvilIcons.js'
import { COLORS } from '../constants';

const SearchComponent = ({}) => {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
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

    const handleDropDownItemPress = (item) => {
        setTimeout(() => {
          console.log(item);
          navigation.navigate(SCREENS.SELLERPROFILE, {seller: item, test: 'hello!'});
        }, 300);
      };

    return (
      <View style={styles.container}>
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
          placeholder={'Search by @ or product'}
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
    );
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 5,
      paddingHorizontal: 15,
    //   borderWidth: 1,
      borderRadius: 5,
      marginHorizontal: 5,
      marginTop: 10
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderRadius: 5,
      paddingHorizontal: 8,
    //   borderWidth: 1,
      backgroundColor: '#e8e8e8'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontFamily: 'HelveticaNeue',
      fontSize: 16,
      color: 'gray'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 30,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    listItem: {
        // marginHorizontal:10,
        marginVertical: 2,
        // backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    listText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'gray'
    }
  });

export default SearchComponent;
