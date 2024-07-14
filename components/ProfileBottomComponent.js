import {View, Text, Image, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React from 'react';
import GalleryComponent from './GalleryComponent';

// const gallery = require('../../assets/mocks/gallery.json');

const FirstRoute = ({gallery}) => (
    <GalleryComponent gallery = {gallery} />
);
  
const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const FirstTabView = () => {
    const layout = useWindowDimensions();
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      {key: 'first', title: 'prods'},
      {key: 'second', title: 'revs'},
    ]);
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });
  
    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => <TabBar {...props} style={{backgroundColor: 'black', borderRadius: 10}}/>} 
      />
    );
  };

const ProfileBottomComponent = ({gallery}) => {
    console.log(gallery)
  return (
    <View style = {styles.galleryContainer}>
        <FirstTabView />
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
        columnGap: 10,
        marginLeft: 0,
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

export default ProfileBottomComponent;