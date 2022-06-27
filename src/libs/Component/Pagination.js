import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export const SLIDE_HIGHT = 0.61 * height;

const styles = StyleSheet.create({
  constainerIndicator: {
    position: 'absolute',
    top: 0.02 * height,
    flexDirection: 'row',
    alignSelf: 'center',
    zIndex: 10,
  },
  dotstyle: {
    height: 4,
    backgroundColor: 'red',
    borderRadius: 4,
    marginHorizontal: 4,
    width: 4,
  },
  containerFooter: {
    backgroundColor: 'white',
    borderTopLeftRadius: 75,
    flexDirection: 'row',
    width: width,
    flex: 1,
  },
  containerTextFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  sub: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 15,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});

const Pagination = ({scrollX, data}) => {
  const inputRangeBackground = data.map((_, i) => i * width);
  const backgroundColor = scrollX.interpolate({
    inputRange: inputRangeBackground,
    outputRange: data.map(DATAONBOARDINGi => DATAONBOARDINGi.color),
  });
  return (
    <Animated.View style={styles.constainerIndicator}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [5, 10, 5],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.dotstyle,
              {
                width: dotWidth,
                backgroundColor: backgroundColor,
                opacity: opacity,
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

export default Pagination;
