
import * as  React from 'react';
import { Platform, View, Linking, BackHandler, Text, Image, TouchableOpacity, Dimensions, FlatList, StyleSheet, Animated } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window')
const imgw = width * 0.7
const imgh = imgw * 1.54

const DATALIST = [
  {
    id: 1,
    image: 'https://cdn.dribbble.com/users/3281732/screenshots/7226813/media/b3c0be6dd52619d555f25af859833fc6.jpg?compress=1&resize=1600x1200'
  },
  {
    id: 2,
    image: 'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=800x600'
  },
  {
    id: 3,
    image: 'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=800x600'
  },
  {
    id: 4,
    image: 'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1600x1200'
  },
  {
    id: 5,
    image: 'https://cdn.dribbble.com/users/3281732/screenshots/11760493/media/9bb379304ad9da048af8487d8d48ba86.jpg?compress=1&resize=1600x1200'
  },
  {
    id: 6,
    image: 'https://cdn.dribbble.com/users/3281732/screenshots/6590709/samji_illustrator.jpg?compress=1&resize=800x600'
  },
]


const DetailScreen = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#232526', '#414345']} style={{ flex: 1, }}>
      {/* <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate('View')}> */}
        <Text style={{ alignSelf: 'center', color: 'white' }}>DetailScreen</Text>
      {/* </TouchableOpacity> */}
    </LinearGradient>
  );
}
export default DetailScreen