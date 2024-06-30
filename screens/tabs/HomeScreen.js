import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import SCREENS from '../screens';

const HomeScreen = () => {
    const navigation = useNavigation();

    const [products, setProducts] = useState([]);

    // Sample product data
    useEffect(() => {
        setProducts([
            { id: '1', uri: 'https://via.placeholder.com/150', title: 'Product 1' },
            { id: '2', uri: 'https://via.placeholder.com/150', title: 'Product 2' },
            { id: '3', uri: 'https://via.placeholder.com/150', title: 'Product 3' },
            { id: '4', uri: 'https://via.placeholder.com/150', title: 'Product 4' },
            { id: '5', uri: 'https://via.placeholder.com/150', title: 'Product 5' },
            { id: '6', uri: 'https://via.placeholder.com/150', title: 'Product 6' },
        ]);
    }, []);

    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate(SCREENS.LOGIN);
            })
            .catch(error => alert(error.message));
    };

    const handleProductPress = (product) => {
        console.log('Product pressed:', product); // Add logging
        navigation.navigate(SCREENS.PRODUCT_DETAIL, { product });
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.productTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>
                    Welcome back!
                </Text>
                <Text> Email: {auth.currentUser?.email} </Text>
                <TouchableOpacity onPress={handleSignout} style={styles.button}>
                    <Text style={styles.buttonText}> Sign out </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    button: {
        backgroundColor: '#6e0280',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: 150,
    },
    productTitle: {
        padding: 5,
        textAlign: 'center',
    },
});
