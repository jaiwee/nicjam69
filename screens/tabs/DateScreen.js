import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const cards = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2'},
  { id: 3, name: 'User 3' }
];
const DateScreen = () => {
  const [swipedAllCards, setSwipedAllCards] = useState(false);

  const handleSwipedAll = () => {
    console.log('All cards swiped'); // Debugging log
    setSwipedAllCards(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          cards={cards}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                <Image source={card.image} style={styles.image} />
                <Text style={styles.cardText}>{card.name}</Text>
              </View>
            );
          }}
          onSwipedAll={handleSwipedAll}
          onSwiped={(cardIndex) => { console.log(`Card swiped, index: ${cardIndex}`) }}
          onSwipedLeft={(cardIndex) => { console.log(`Card swiped left, index: ${cardIndex}`) }}
          onSwipedRight={(cardIndex) => { console.log(`Card swiped right, index: ${cardIndex}`) }}
          cardIndex={0}
          backgroundColor={'#fff'}
          stackSize={3}
          infinite
          containerStyle={styles.swiper} // Center align the swiper
          cardStyle={styles.cardContainer} // Center align the cards within the swiper
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
        <TouchableOpacity style={styles.button} onPress={() => console.log('Buy Now pressed')}>
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
    alignItems: 'center', // Center align the swiper container
    width: '100%', // Ensure it takes full width
    marginTop: -120,
  },
  swiper: {
    flex: 1,
    marginBottom: 20, // Ensure there's space for the button
    justifyContent: 'center',
  },
  cardContainer: {
    justifyContent: 'center', // Center align the cards within the swiper
    alignItems: 'center',
  },
  card: {
    width: 300, // Set a fixed width for the cards
    height: 400, // Set a fixed height for the cards
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center', // Center align the content inside the card
    backgroundColor: 'white',
    overflow: 'hidden', // Ensure the image is properly clipped to the card's border radius
    marginBottom: 20, // Add margin to create space between cards and button
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