import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust the import path as needed
import SCREENS from '../screens';

const { width, height } = Dimensions.get('window');

const locations = ['National University of Singapore', 'Singapore Management University', 'Nanyang Technological University'];

const DateScreen = () => {
  const [products, setProducts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('National University of Singapore');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const fetchedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    });
    return unsubscribe;
  }, []);

  const handleSwipedRight = (cardIndex) => {
    const likedProduct = products[cardIndex];
    setLikedPosts((prevLikedPosts) => [...prevLikedPosts, likedProduct]);
  };

  const handleBuyNowPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
    setLocationModalVisible(false);
  };

  const handleViewLikedPosts = () => {
    navigation.navigate('LikedPosts', { likedPosts });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME)} style={styles.iconButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity onPress={() => setLocationModalVisible(true)}>
            <Text style={styles.locationText}>{selectedLocation}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleViewLikedPosts} style={styles.iconButton}>
          <Icon name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.swiperContainer}>
        {products.length > 0 ? (
          <Swiper
            cards={products}
            renderCard={(product) => (
              <View style={styles.card}>
                {product.imageURL ? (
                  <Image source={{ uri: product.imageURL }} style={styles.image} />
                ) : (
                  <View style={styles.noImage}>
                    <Text>No Image Available</Text>
                  </View>
                )}
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{product.productName}</Text>
                  <Text style={styles.cardDescription}>{product.productDesc}</Text>
                  <Text style={styles.cardPrice}>${product.price}</Text>
                  <Text style={styles.cardSeller}>{product.sellerName}</Text>
                </View>
                <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyNowPress(product)}>
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            )}
            onSwipedRight={handleSwipedRight}
            cardIndex={0}
            backgroundColor="#fff"
            stackSize={3}
            infinite
            containerStyle={styles.swiper}
            cardStyle={styles.cardContainer}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'red',
                    borderColor: 'red',
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 24,
                    padding: 10,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    marginLeft: -20,
                  },
                },
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: 'green',
                    borderColor: 'green',
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 24,
                    padding: 10,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    marginLeft: 20,
                  },
                },
              },
            }}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <Modal visible={locationModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <FlatList
              data={locations}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleLocationPress(item)}>
                  <Text style={styles.locationItem}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity onPress={() => setLocationModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  iconButton: {
    padding: 10,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
  swiperContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  swiper: {
    flex: 1,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    height: height * 0.4, // Adjust the height to fit better
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%', // Adjust the image height to fit the card better
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  noImage: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardTextContainer: {
    padding: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  cardSeller: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationItem: {
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default DateScreen;
