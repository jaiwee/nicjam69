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
            { id: '1', uri: 'https://nationalvintageleague.com/cdn/shop/files/IMG_1279_1200x1200.jpg?v=1614337388', title: 'interest check for vintage nfl jerseys!', liked: false, likes: 10 },
            { id: '2', uri: 'https://i.pinimg.com/736x/db/96/fb/db96fb534750538b196561d8d5a475f7.jpg', title: 'sneak peek for our next drop!', liked: false, likes: 5 },
            { id: '3', uri: 'https://media.karousell.com/media/photos/products/2024/5/7/smiski_keychain_hiding_series__1715059984_4af35980_progressive.jpg', title: 'customs open!', liked: false, likes: 8 },
            { id: '4', uri: 'https://media.karousell.com/media/photos/products/2024/4/8/peach_pink_glass_beads_bracele_1712549276_ffbec1f2_progressive.jpg', title: 'absolutely LOVE my new purchase', liked: false, likes: 12 },
            { id: '5', uri: 'https://via.placeholder.com/150', title: 'Post 5', liked: false, likes: 3 },
            { id: '6', uri: 'https://via.placeholder.com/150', title: 'Post 6', liked: false, likes: 6 },
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
        console.log('Product pressed:', product);
        navigation.navigate(SCREENS.PRODUCT_DETAIL, { product });
    };

    const handleLikePress = (id) => {
        setProducts(products.map(product => {
            if (product.id === id) {
                const updatedLikes = product.liked ? product.likes - 1 : product.likes + 1;
                return { ...product, liked: !product.liked, likes: updatedLikes };
            }
            return product;
        }));
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.likeContainer}>
                    <TouchableOpacity onPress={() => handleLikePress(item.id)}>
                        <Text style={[styles.likeButton, item.liked ? styles.liked : null]}>
                            {item.liked ? '♥' : '♡'}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.likesCount}>{item.likes} likes</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
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
        backgroundColor: '#F1F3FA',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: '800',
        fontSize: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    productContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        paddingBottom: 10,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 150,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    productTitle: {
        flex: 1,
        textAlign: 'center',
    },
    likeContainer: {
        alignItems: 'center',
    },
    likeButton: {
        fontSize: 24,
        padding: 5,
        color: '#888',
    },
    liked: {
        color: 'red',
    },
    likesCount: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
    },
});
