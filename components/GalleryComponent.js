import {View, Text, Image, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React from 'react';
import COLORS from '../constants/colors';

const FirstRoute = ({gallery}) => (
    <View style = {styles.galleryContainer}>
        {gallery.map((item, index) => {
            return (
                // <Image 
                // style = {styles.galleryCard}
                // key = {index} source = {{uri: item}}/>
                <View key = {item.imageURL} >
                    <Image 
                        style = {styles.galleryCard}
                        source = {{uri: item.imageURL}}/>
                </View>
            )
        })}
    </View>
);
  
const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ProfileTabs = ({gallery}) => {
    const layout = useWindowDimensions();
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      {key: 'first', title: 'Products'},
      {key: 'second', title: 'Reviews'},
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            console.log("here!!")
            console.log("gallery is", gallery)
            return <FirstRoute gallery={gallery} />;
          case 'second':
            return <SecondRoute />;
          default:
            return null;
        }
      };

      const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'gray', height: 1}}
          style={{ backgroundColor: COLORS.BLUE }}
          renderLabel={({ route, focused, color }) => (
            <Text style={[styles.label, focused ? styles.labelActive : styles.label]}>
              {route.title}
            </Text>
          )}
        />
      );
    
  
    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    );
  };

const GalleryComponent = ({gallery}) => {
    console.log("GALLERY COMPONENT LOADED")
    console.log(gallery)
  return (
    <View style = {styles.galleryContainer}>
        <ProfileTabs gallery={gallery}/>
    </View>
  );
};



const styles = StyleSheet.create({
    galleryContainer: {
        height: 1000,
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
    },
    label: { 
        color: 'grey', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase'
    },
    labelActive: {
        color: 'black'
    }

})

export default GalleryComponent;