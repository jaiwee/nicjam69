import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const cards = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2'},
  { id: 3, name: 'User 3' }
];
const DateScreen = () => {
  return (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        renderCard={(card) => {
          console.log(`Rendering card: ${card.name}`); // Debugging statement
          return (
            <View style={styles.card}>
              <Image
                source={{ uri: card.image }}
                style={styles.image}
                onError={(e) => console.log(e.nativeEvent.error)} // Log any errors
              />
              <Text style={styles.text}>{card.name}</Text>
            </View>
          );
        }}
        onSwiped={(cardIndex) => { console.log(`Card swiped, index: ${cardIndex}`) }}
        onSwipedAll={() => { console.log('All cards swiped') }}
        onSwipedLeft={(cardIndex) => { console.log(`Card swiped left, index: ${cardIndex}`) }}
        onSwipedRight={(cardIndex) => { console.log(`Card swiped right, index: ${cardIndex}`) }}
        cardIndex={0}
        backgroundColor={'#4FD0E9'}
        stackSize={3}
        infinite
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
    overflow: 'hidden' // Ensure the image is properly clipped to the card's border radius
  },
  image: {
    width: '100%',
    height: '80%',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'transparent'
  }
});

export default DateScreen;