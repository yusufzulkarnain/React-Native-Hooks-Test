import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
  Animated,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Styles from './style';
import SwipeButton from 'rn-swipe-button';
import {
  ExpandingDot,
  ScalingDot,
  SlidingDot,
  SlidingBorder,
  LiquidLike,
} from 'react-native-animated-pagination-dots';

const {width, height} = Dimensions.get('window');
const imgw = width * 0.7;
const imgh = imgw * 1.54;

function IntroScreen({onSubmit}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [activeSlide, SetAcitveSlide] = React.useState(0);
  const [currentIndex, SetCurrentIndex] = React.useState(0);
  const [userToken, SetUserToken] = React.useState(null);
  const DATALIST = [
    {
      id: 0,
      image: require('../../res/Image/intro2.jpeg'),
    },
    {
      id: 1,
      image: require('../../res/Image/intro1.jpeg'),
    },
    {
      id: 2,
      image: require('../../res/Image/video_image.jpeg'),
    },
  ];
  const slideRef = React.useRef(null);
  const viewableItemsChanged = React.useRef(({viewableItems}) => {
    SetCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = React.useRef({viewAreaCoverPercentThreshold: 50});
  const icon = require('../../res/icon/right-arrow.png');
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#232526', '#414345']}
      style={Styles.containerGradient}>
      <StatusBar hidden />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        data={DATALIST}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });
          return (
            <View style={Styles.imageFrameOnborarding}>
              <Animated.Image
                source={item.image}
                style={[{width: width, height: height}, {opacity: opacity}]}
                resizeMode={'cover'}
              />
            </View>
          );
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={viewableItemsChanged.current}
        scrollEventThrottle={32}
        decelerationRate={'normal'}
        viewabilityConfig={viewConfig}
        ref={slideRef}
      />
      {/* <Indicator data={DATALIST} scrollX={scrollX} /> */}
      <ExpandingDot
        data={DATALIST}
        expandingDotWidth={20}
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        activeDotColor={'rgba(255, 255, 255, 0.4)'}
        dotStyle={{
          width: 5,
          height: 5,
          backgroundColor: '#347af0',
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        containerStyle={{
          bottom: 10,
        }}
      />
      <SwipeButton
        shouldDisableTouch={true}
        thumbIconImageSource={icon}
        thumbIconBackgroundColor="rgba(0,0,255,0.7)"
        // thumbIconComponent={thumbComponent}
        thumbIconStyles={{width: 100}}
        titleStyles={{fontSize: 16}}
        thumbIconBorderColor="#00000"
        onSwipeSuccess={onSubmit}
      />
    </LinearGradient>
  );
}

export default IntroScreen;
