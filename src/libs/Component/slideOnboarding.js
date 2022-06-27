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
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SwipeButton from 'rn-swipe-button';
import {
  ExpandingDot,
  ScalingDot,
  SlidingDot,
  SlidingBorder,
  LiquidLike,
} from 'react-native-animated-pagination-dots';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {NavigationScreenProp} from 'react-navigation';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styles from '../../screens/intro/style';

const {width, height} = Dimensions.get('window');
export const SLIDE_HIGHT = 0.61 * height;
const styles = StyleSheet.create({
  container: {
    width,
    // flex: 1,
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 80,
    color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontFamily: 'Poppins-Bold',
  },
  titleCOntainer: {
    height: 100,
    justifyContent: 'center',
  },
  imagesContainer: {
    // backgroundColor: 'blue',
    // width: width,
    alignSelf: 'center',
    // marginBottom: 16,
    alignItems: 'center',
    marginLeft: 10,
    // flex: 1,
    // borderWidth: 2,
  },
  imageStyle: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: 75,
    // top: 75,
    // flex: 1,
  },
  underLay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
});

class SlideOnBoarding extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    right: PropTypes.bool,
    image: PropTypes.any,
    scrollX: PropTypes.any,
  };
  render() {
    const {label, right, image, key, opacity, data} = this.props;
    const transform = [
      {translateY: (SLIDE_HIGHT - 100) / 2},
      {
        translateX: right ? width / 2 - 50 : -width / 2 + 50,
      },
      {
        rotate: right ? '-90deg' : '-90deg',
      },
    ];
    return (
      <View key={key} style={styles.container}>
        <View style={styles.underLay}>
          <Animated.Image
            source={image}
            style={[styles.imageStyle, {opacity: opacity}]}
            resizeMode="cover"
          />
        </View>
        <Animated.View
          style={[styles.titleCOntainer, {transform, opacity: opacity}]}>
          <Text style={styles.title}>{label}</Text>
        </Animated.View>
      </View>
    );
  }
}

export default SlideOnBoarding;
