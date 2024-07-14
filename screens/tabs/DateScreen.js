import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SCREENS from '../screens';

const cards = [
  { id: 1, name: 'Handmade beaded necklace', image: 'https://media.karousell.com/media/photos/products/2023/10/27/handmade_beaded_necklace_brace_1698370420_d02b5ba7_progressive.jpg', description: 'User 1 description' },
  { id: 2, name: 'Vintage bag', image: 'https://media.karousell.com/media/photos/products/2023/3/1/y2k_vintage_shoulder_bag_1677650889_6045c786_progressive.jpg', description: 'User 2 description' },
  { id: 3, name: 'Crochet crop top', image: 'https://media.karousell.com/media/photos/products/2021/6/21/crochet_toga_top_1624243146_86b84ce9_progressive.jpg', description: 'User 3 description' },
];

const locations = ['National University of Singapore', 'Singapore Management University', 'Nanyang Technological University'];

const DateScreen = () => {
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('National University of Singapore');
  const navigation = useNavigation();

  const handleSwipedAll = () => {
    console.log('All cards swiped');
    setSwipedAllCards(true);
  };

  const handleSwipedRight = (cardIndex) => {
    setLikedPosts([...likedPosts, cards[cardIndex]]);
  };

  const handleBuyNowPress = () => {
    const product = cards[0];
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
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME)} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#888" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity onPress={() => setLocationModalVisible(true)}>
            <Text style={styles.locationText}>Location: {selectedLocation}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleViewLikedPosts} style={styles.likeButton}>
          <Icon name="heart-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          cards={cards}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.image} />
              <Text style={styles.cardText}>{card.name}</Text>
            </View>
          )}
          onSwipedAll={handleSwipedAll}
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
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleBuyNowPress}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
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
  },
  backButton: {
    padding: 10,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    color: '#888',
  },
  likeButton: {
    padding: 10,
  },
  likeButtonText: {
    fontSize: 24,
    color: '#888',
  },
  swiperContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10, // Adjust the padding to ensure swiper starts below the header
  },
  swiper: {
    flex: 1,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 400,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '80%',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 18, // Adjust the font size for better visibility
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: '#F1F3FA',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
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
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default DateScreen;
