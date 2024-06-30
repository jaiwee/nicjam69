import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens';

const cards = [
  { id: 1, name: 'User 1', image: 'https://via.placeholder.com/150', description: 'User 1 description' },
  { id: 2, name: 'User 2', image: 'https://via.placeholder.com/150', description: 'User 2 description' },
  { id: 3, name: 'User 3', image: 'https://via.placeholder.com/150', description: 'User 3 description' },
];

const DateScreen = () => {
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const navigation = useNavigation();

  const handleSwipedAll = () => {
    console.log('All cards swiped');
    setSwipedAllCards(true);
  };

  const handleBuyNowPress = () => {
    const product = cards[0];
    navigation.navigate(SCREENS.PRODUCT_DETAIL, { product });
  };

  return (
    <View style={styles.container}>
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
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'red',
                  borderColor: 'red',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'green',
                  borderColor: 'green',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20
                }
              }
            },
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBuyNowPress}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -120,
  },
  swiper: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'center',
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
    fontSize: 24,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F3FA',
  },
  button: {
    backgroundColor: '#F1F3FA',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DateScreen;
