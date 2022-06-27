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
import Icon from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width, height} = Dimensions.get('screen');
const item_width = width * 0.76;
const item_height = item_width * 1.54;

const DATALIST = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1550699566-83f93df24072?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    user: 'https://randomuser.me/api/portraits/women/63.jpg',
    name: 'unknow',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1484406566174-9da000fda645?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=670&q=80',
    user: 'https://randomuser.me/api/portraits/men/34.jpg',
    name: 'unknow',
  },
  {
    id: 3,
    image:
      'https://images.wallpaperscraft.com/image/red_panda_animal_leaves_168155_800x600.jpg',
    user: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'unknow',
  },
  {
    id: 4,
    image:
      'https://images.wallpaperscraft.com/image/tiger_animal_predator_200052_800x600.jpg',
    user: 'https://randomuser.me/api/portraits/women/85.jpg',
    name: 'unknow',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1497119146420-012f8fc80a3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=666&q=80',
    user: 'https://randomuser.me/api/portraits/women/28.jpg',
    name: 'unknow',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
    user: 'https://randomuser.me/api/portraits/women/63.jpg',
    name: 'unknow',
  },
];

const FavoriteScreen = ({navigation}) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#232526', '#414345']}
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingVertical: getStatusBarHeight(),
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight || 42,
          left: 16,
          zIndex: 10,
        }}>
        <Icon
          name="arrow-back-circle-outline"
          size={34}
          style={{color: 'white'}}
        />
      </TouchableOpacity>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        data={DATALIST}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          return (
            <View
              style={{justifyContent: 'center', width, alignItems: 'center'}}>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowRadius: 30,
                  backgroundColor: 'white',
                  padding: 12,
                  borderRadius: 18,
                }}>
                <View
                  style={{
                    width: item_width,
                    height: item_height,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 18,
                  }}>
                  <Animated.Image
                    source={{uri: item.image}}
                    style={{
                      width: item_width * 1.4,
                      height: item_height,
                      transform: [{translateX}],
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <Image
                  source={{uri: item.user}}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    position: 'absolute',
                    bottom: -30,
                    alignSelf: 'center',
                    borderWidth: 6,
                    borderColor: 'white',
                  }}
                  resizeMode={'cover'}
                />
              </View>
            </View>
          );
        }}
      />
    </LinearGradient>
  );
};
export default FavoriteScreen;
