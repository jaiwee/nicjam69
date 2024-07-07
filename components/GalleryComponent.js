import {View, Text, Image, StyleSheet, Dimensions, useWindowDimensions, Animated } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Rating } from 'react-native-ratings';
import ProgressBar from 'react-native-progress/Bar';
import { Divider } from 'react-native-paper'; 
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
  
const SecondRoute = ({reviews, reviewSummary, totalReviews, totalRating}) => (

    <View style = {styles.galleryContainer}>

        <View style = {{flexDirection: 'row', marginVertical: 5, flex:1}}>
            <View style = {{marginRight: 5}}>
                {Object.keys(reviewSummary).map(rating => (
                    <View style = {{flexDirection: 'row', height: 20}}>
                        <Text>{rating} </Text>
                        <Rating
                                type = 'custom'
                                readonly = {true}
                                startingValue={1}
                                ratingCount = {1}
                                imageSize= {15}
                                // style={{justifyContent:'flex-start'}}
                                tintColor={COLORS.BLUE}
                                ratingColor = { '#f1c40f'}
                                style = {{marginRight: 3, marginLeft: 0}}
                                
                            />

                        <View> 
                            <ProgressBar 
                                progress={reviewSummary[rating] / totalReviews} 
                                width={200}
                                height={10} 
                                animationType = "decay"
                                color={'gray'}
                                unfilledColor={'lightgray'}
                                borderWidth={0}
                                style = {{marginTop: 3}}
                            />
                        </View>                 
                    </View>
                ))}                  
            </View>

            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: 40, fontFamily: 'Helvetica-Bold', alignItems: 'center', justifyContent: 'center'}}> {(totalRating / totalReviews).toFixed(1)} </Text>
                <Text> out of {totalReviews} reviews </Text>
            </View>
        </View>

        <View>
            <Text style = {{fontSize: 25, fontFamily: 'Helvetica-Bold', paddingBottom: 5}}>Reviews </Text>
            <Divider style = {{ height: 1, color: 'black', marginBottom: 10}}/>

            {reviews.map((item, index) => {
                return (
                    <View key = {item.imageURL} style = {{paddingBottom: 7}}>
                            <Text style = {{fontFamily: 'Helvetica-bold', paddingTop: 2}}>{item.buyerName} </Text>
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {{paddingTop: 2, marginRight: 3, color: 'gray', fontFamily: 'HelveticaNeue-LightItalic', fontSize: 12}}>{item.rating} out of 5 stars </Text>
                                <Rating
                                    type = 'custom'
                                    readonly = {true}
                                    onFinishRating={this.ratingCompleted}
                                    startingValue={parseFloat(item.rating)}
                                    imageSize= {20}
                                    style={{justifyContent:'flex-start'}}
                                    tintColor={COLORS.BLUE}
                                    ratingColor = {item.rating > 1 ? '#f1c40f' : '#8B0000'}
                                    
                                />
                            </View>
                    
                        <Text style = {{fontFamily: 'Helvetica Neue'}}>{item.reviewDesc} </Text>
                        
                    </View>
                )
            })}


        </View>

        
    </View>
);

const ProfileTabs = ({gallery, reviews, reviewSummary}) => {
    const layout = useWindowDimensions();
    console.log("REVIEWS HERE ------->")
    console.log(reviews);
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      {key: 'first', title: 'Products'},
      {key: 'second', title: 'Reviews'},
    ]);

    let totalSum = 0;
    for (let rating in reviewSummary) {
      totalSum += reviewSummary[rating];
    }

    const totalRating = Object.keys(reviewSummary).reduce((sum, curr) => sum + (curr * reviewSummary[curr]), 0);
    console.log("totalRating is ", totalRating)

    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            console.log("here!!")
            console.log("gallery is", gallery)
            return <FirstRoute gallery={gallery} />;
          case 'second':
            return <SecondRoute reviews={reviews} reviewSummary={reviewSummary} totalReviews={totalSum} totalRating = {totalRating}/>;
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

const GalleryComponent = ({gallery, reviews, reviewSummary}) => {
    // console.log("GALLERY COMPONENT LOADED")
    // console.log(gallery)
  return (
    <View style = {styles.galleryContainer}>
        <ProfileTabs gallery={gallery} reviews = {reviews} reviewSummary = {reviewSummary}/>
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
        flex: 1,
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