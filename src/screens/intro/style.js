import {Platform, StyleSheet, Dimensions} from 'react-native';
import {Colors} from '@res';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Header} from 'react-navigation-stack';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const mWindow = Dimensions.get('window');
const {width, height} = Dimensions.get('window');
const Styles = StyleSheet.create({
  containerGradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  imageFrameOnborarding: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Styles;
