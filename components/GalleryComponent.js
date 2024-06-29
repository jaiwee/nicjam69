import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const GalleryComponent = ({gallery}) => {
    console.log(gallery)
  return (
    <View style = {styles.galleryContainer}>
        {gallery.map((item, index) => {
            return (
                <Image 
                style = {styles.galleryCard}
                key = {index} source = {{uri: item}}/>
            )
        })}
    </View>
  );
};

const styles = StyleSheet.create({
    galleryContainer: {
        flexDirection: 'row',
        marginTop: 10,
        flexWrap: 'wrap',
        rowGap: 8,
        columnGap: 10
    },
    galleryCard: {
        width:( Dimensions.get('screen').width - 50) / 2,
        height: 150,
        resizeMode: 'cover',
        borderColor: 'black',
        borderWidth: 0.4,
        borderRadius: 5
    }

})

export default GalleryComponent;