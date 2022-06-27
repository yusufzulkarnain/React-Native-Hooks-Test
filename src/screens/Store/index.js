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
import {
  useResponsiveHeight,
  useResponsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Image } from 'react-native-elements';
// const { width, height } = Dimensions.get('window')
// const imgw = width * 0.7
// const imgh = imgw * 1.54

const DATALIST = [
  {
    id: 1,
    title: 'Where does it come fromWhere does it come from?',
    description:
      's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image:
      'https://cdn.dribbble.com/users/1933308/screenshots/10866085/media/b9fca92623c566fda9356b1184d76543.png?compress=1&resize=1600x1200',
  },
  {
    id: 2,
    title: 'Why do we use it',
    description:
      's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image:
      'https://cdn.dribbble.com/users/1877141/screenshots/4072041/scoot.jpg?compress=1&resize=800x600',
  },
  {
    id: 3,
    title: 'What is Lorem Ipsum',
    description:
      's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image:
      'https://cdn.dribbble.com/users/1731254/screenshots/10835576/media/90cba8e43354880d1c13515f90d5503a.png?compress=1&resize=1600x1200',
  },
  {
    id: 4,
    title: 'What is Lorem Ipsum',
    description:
      's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image:
      'https://cdn.dribbble.com/users/1731254/screenshots/10835576/media/90cba8e43354880d1c13515f90d5503a.png?compress=1&resize=1600x1200',
  },
  {
    id: 5,
    title: 'What is Lorem Ipsum',
    description:
      's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image:
      'https://cdn.dribbble.com/users/2417352/screenshots/14601875/media/061a551903f4e996c91febca13666612.png?compress=1&resize=1600x1200',
  },
  {
    id: 6,
    title: 'What is Lorem Ipsum',
    description:
      's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image:
      'https://cdn.dribbble.com/users/719060/screenshots/15721561/media/cd40d0154e0629e6ae34ca0df27e8e10.jpg?compress=1&resize=1600x1200',
  },
];

const StoreScreen = ({navigation}) => {
  const height = useResponsiveHeight(25);
  const width = useResponsiveWidth(90);

  const heightImg = useResponsiveHeight(25);
  const widthImg = useResponsiveWidth(90);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      // alert('l')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#232526', '#414345']}
      style={{flex: 1}}>
      <Animated.FlatList
        contentContainerStyle={{
          paddingTop: 12,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        bounces={false}
        data={DATALIST}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          const itemSize = heightImg + 4 * 3;
          const inputRange = [-1, 0, itemSize * index, itemSize * (index + 2)];
          const OpacityinputRange = [
            -1,
            0,
            itemSize * index,
            itemSize * (index + 1),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          // const opacity = scrollY.interpolate({
          //     OpacityinputRange,
          //     outputRange:[1,1,1,0]
          // })
          return (
            <Animated.View
              style={{
                overflow: 'hidden',
                alignSelf: 'center',
                borderRadius: 12,
                marginBottom: 12,
                width,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                shadowColor: '#000',
                shadowOpacity: 1,
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowRadius: 20,
                // opacity,
                transform: [{scale}],
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DetailList', {
                    image: item.image,
                    user: 'https://randomuser.me/api/portraits/women/63.jpg',
                    description: item.description,
                  });
                }}
                style={{width: widthImg, height: heightImg}}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: null,
                    height: null,
                    flex: 1,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  resizeMode={'cover'}
                />
                <View
                  style={{
                    width,
                    padding: 10,
                    flexDirection: 'row',
                    backgroundColor: 'rgba(52, 52, 52, 0.7)',
                    position: 'absolute',
                    bottom: 0,
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    colors={['#232526', '#414345']}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40,
                      padding: 3,
                    }}>
                    <Image
                      source={{
                        uri: 'https://randomuser.me/api/portraits/women/63.jpg',
                      }}
                      style={{
                        width: null,
                        height: null,
                        flex: 1,
                        borderRadius: 40,
                      }}
                      resizeMode={'cover'}
                    />
                  </LinearGradient>

                  <View style={{width: 250, marginLeft: 12}}>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'justify',
                        color: 'white',
                        marginTop: 4,
                        fontWeight: '700',
                      }}>
                      {'Denis Susanne'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: 'justify',
                        opacity: 0.7,
                        color: 'white',
                        marginTop: 4,
                      }}>
                      {'2 hour ago'}
                    </Text>
                  </View>
                  <Image
                    source={require('../.././res/icon/wishlist.png')}
                    resizeMode={'contain'}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 4,
                      tintColor: 'white',
                      marginLeft: 'auto',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </LinearGradient>
  );
};
export default StoreScreen;
