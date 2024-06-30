import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
    const { product } = route.params;

    console.log('Product detail:', product); // Add logging

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.uri }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            {/* Add more product details here */}
        </View>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
