import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon from react-native-vector-icons
import SCREENS from '../screens';

const cards = [
  { id: 1, name: 'Handmade beaded necklace', image: 'https://media.karousell.com/media/photos/products/2023/10/27/handmade_beaded_necklace_brace_1698370420_d02b5ba7_progressive.jpg', description: 'User 1 description' },
  { id: 2, name: 'Vintage bag', image: 'https://media.karousell.com/media/photos/products/2023/3/1/y2k_vintage_shoulder_bag_1677650889_6045c786_progressive.jpg', description: 'User 2 description' },
  { id: 3, name: 'Crochet crop top', image: 'https://media.karousell.com/media/photos/products/2021/6/21/crochet_toga_top_1624243146_86b84ce9_progressive.jpg', description: 'User 3 description' },
];

const DateScreen = () => {
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation();

  const handleSwipedAll = () => {
    console.log('All cards swiped');
    setSwipedAllCards(true);
  };

  const handleBuyNowPress = () => {
    const product = cards[0];
    navigation.navigate(SCREENS.PRODUCT_DETAIL, { product });
  };

  const handleLikePress = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME)} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#888" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Discover</Text>
          <Text style={styles.locationText}>Location: National University of Singapore</Text>
        </View>
        <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
          <Text style={styles.likeButtonText}>{liked ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          cards={cards}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                <Image source={{ uri: card.image }} style={styles.image} />
                <Text style={styles.cardText}>{card.name}</Text>
              </View>
            );
          }}
          onSwipedAll={handleSwipedAll}
          cardIndex={0}
          backgroundColor={'#fff'}
          stackSize={3}
          infinite
          containerStyle={styles.swiper}
          cardStyle={styles.cardContainer}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleBuyNowPress}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
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
});

export default DateScreen;
