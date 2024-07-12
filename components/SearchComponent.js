import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens/screens';
import { Dropdown } from 'react-native-searchable-dropdown-kj'

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
                <Text>
                    hello
                </Text>
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
            handleDropDownItemPress(item);
            setValue(item.value);
            setIsFocus(false);
          }}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderRadius: 8,
      paddingHorizontal: 8,
      borderBottomWidth: 0.5,
      backgroundColor: "#F1F3FA"
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
