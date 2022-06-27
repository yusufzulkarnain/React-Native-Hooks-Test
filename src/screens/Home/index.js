import * as React from 'react';
import {
  Platform,
  View,
  Linking,
  BackHandler,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const imgw = width * 0.7;
const imgh = imgw * 1.54;

const DATALIST = [
  {
    id: 1,
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/7226813/media/b3c0be6dd52619d555f25af859833fc6.jpg?compress=1&resize=1600x1200',
  },
  {
    id: 2,
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=800x600',
  },
  {
    id: 3,
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=800x600',
  },
  {
    id: 4,
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1600x1200',
  },
  {
    id: 5,
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11760493/media/9bb379304ad9da048af8487d8d48ba86.jpg?compress=1&resize=1600x1200',
  },
  {
    id: 6,
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/6590709/samji_illustrator.jpg?compress=1&resize=800x600',
  },
];

const HomeScreen = ({navigation}) => {
  const [randomUser, setRandomUser] = React.useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    let isMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      if (isMounted) {
        axios
          .get('https://randomuser.me/api/?results=2')
          .then(function (response) {
            console.log(JSON.stringify(response.data.results));
            const initialState = response.data.results.map(obj => obj);
            setRandomUser(initialState);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      return () => {
        isMounted = false;
        //BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    });
  }, [navigation]);

  function getUser(params) {
    axios
      .get('https://randomuser.me/api/?results=2')
      .then(function (response) {
        console.log(JSON.stringify(response.data.results));
        const initialState = response.data.results.map(obj => obj);
        setRandomUser(initialState);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#232526', '#414345']}
      style={{flex: 1, paddingTop: getStatusBarHeight()}}>
      <StatusBar hidden />
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 16}}>
        <LinearGradient
          onStartShouldSetResponder={() => navigation.navigate('View')}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#009FFF', '#ec2F4B']}
          style={{
            width: wp('90%'),
            height: hp('16%'),
            alignSelf: 'center',
            borderRadius: 16,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('View')}
            style={{width: wp('90%'), height: hp('16%')}}>
            <Image
              source={require('../../res/Image/flame-illustrator-at-work.png')}
              style={{
                width: wp('40%'),
                height: hp('15%'),
                position: 'absolute',
                right: -8,
                bottom: 4,
              }}
              resizeMode={'cover'}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily:
                  Platform.OS === 'android' ? 'GothamMedium' : 'Ionicons',
                position: 'absolute',
                bottom: 10,
                left: 10,
              }}>
              FlatList Background
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          onStartShouldSetResponder={() => navigation.navigate('Favorite')}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#3b8d99', '#6b6b83', '#aa4b6b']}
          style={{
            width: wp('90%'),
            height: hp('16%'),
            alignSelf: 'center',
            borderRadius: 16,
            marginTop: 12,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Favorite')}
            style={{width: wp('90%'), height: hp('16%')}}>
            <Image
              source={require('../../res/Image/flame-806.png')}
              style={{
                width: wp('40%'),
                height: hp('15%'),
                position: 'absolute',
                right: -8,
                bottom: 4,
              }}
              resizeMode={'cover'}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily:
                  Platform.OS === 'android' ? 'GothamMedium' : 'Ionicons',
                position: 'absolute',
                bottom: 10,
                left: 10,
              }}>
              Paralax
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          onStartShouldSetResponder={() => navigation.navigate('Camera')}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#b92b27', '#1565C0']}
          style={{
            width: wp('90%'),
            height: hp('16%'),
            alignSelf: 'center',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
            overflow: 'hidden',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Camera')}
            style={{width: wp('90%'), height: hp('16%')}}>
            <Image
              source={require('../../res/Image/jaconda-48.png')}
              style={{
                width: wp('40%'),
                height: hp('12%'),
                position: 'absolute',
                right: 0,
                bottom: 4,
              }}
              resizeMode={'cover'}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily:
                  Platform.OS === 'android' ? 'GothamMedium' : 'Ionicons',
                position: 'absolute',
                bottom: 10,
                left: 10,
              }}>
              Camera
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          onStartShouldSetResponder={() => navigation.navigate('Maps')}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#355C7D', '#6C5B7B', '#C06C84']}
          style={{
            width: wp('90%'),
            height: hp('16%'),
            alignSelf: 'center',
            borderRadius: 16,
            marginTop: 12,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Maps')}
            style={{width: wp('90%'), height: hp('16%')}}>
            <Image
              source={require('../../res/Image/map-pointer.png')}
              style={{
                width: wp('50%'),
                height: hp('15%'),
                position: 'absolute',
                right: -20,
                bottom: 0,
              }}
              resizeMode={'contain'}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily:
                  Platform.OS === 'android' ? 'GothamMedium' : 'Ionicons',
                position: 'absolute',
                bottom: 10,
                left: 10,
              }}>
              Location
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          onStartShouldSetResponder={() => navigation.navigate('Maps')}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#355C7D', '#6C5B7B', '#C06C84']}
          style={{
            width: wp('90%'),
            height: hp('16%'),
            alignSelf: 'center',
            borderRadius: 16,
            marginTop: 12,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signature')}
            style={{width: wp('90%'), height: hp('16%')}}>
            <Image
              source={require('../../res/Image/signature.png')}
              style={{
                width: wp('45%'),
                height: hp('15%'),
                position: 'absolute',
                right: -20,
                bottom: 0,
              }}
              resizeMode={'contain'}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily:
                  Platform.OS === 'android' ? 'GothamMedium' : 'Ionicons',
                position: 'absolute',
                bottom: 10,
                left: 10,
              }}>
              Signature
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};
export default HomeScreen;
