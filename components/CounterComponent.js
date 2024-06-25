import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const CounterComponent = ({counter, description}) => {
  return (
    <View style = {styles.counterContainer}>
      <Text style = {styles.counter}>{counter}</Text>
      <Text style = {styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    counterContainer: {
        alignItems:'center'
    },
    counter: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    description: {        
        fontSize: 16,
        color: '#4f8096'
    }}
)
export default CounterComponent;