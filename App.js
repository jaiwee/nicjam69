import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/auth/LoginScreen';
import HomeScreen from './screens/tabs/HomeScreen';
import StackNavigation from './navigation/tabs';
import DateScreen from './screens/tabs/DateScreen';
import PostDetailScreen from './screens/tabs/PostDetailScreen'; 
import LikedPostsScreen from './screens/tabs/LikedPostsScreen';
import SellerProfileScreen from './screens/search/SellerProfileScreen'; 


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
        {/* <Stack.Navigator>
          <Stack.Screen options= {{headerShown : true}} name="Login" component={LoginScreen}/>
          <Stack.Screen options= {{headerShown : true, headerLeft: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Login"
              color="blue"
            />
          ),}} name="Home" component={HomeScreen} />
          
        </Stack.Navigator> */}
    </NavigationContainer>
  );
}


// const App = () => {
//   useEffect(() => {
//     if (Platform.OS === 'android') SplashScreen.hide();
//   }, []);

//   return (
//     <NavigationContainer>
//       <StackNavigation />
//     </NavigationContainer>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
