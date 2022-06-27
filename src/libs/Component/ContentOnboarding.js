import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Styles from '../../screens/intro/style';

const {width, height} = Dimensions.get('window');
export const SLIDE_HIGHT = 0.61 * height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerFooter: {
    backgroundColor: 'white',
    borderTopLeftRadius: 75,
    flexDirection: 'row',
  },
  containerTextFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    paddingHorizontal: 16,
    color: 'black',
  },
  sub: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  conatinerBottom: {
    position: 'absolute',
    bottom: 16,
    width: width / 2 + 50,
    backgroundColor: '#2CB9B0',
    borderRadius: 25,
    shadowColor: '#2CB9B0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textstylebtn: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  stylebtnskip: {
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
  donebtn: {
    fontSize: 16,
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
  },
  textstylebtndone: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
});

const Wordinganimated = ({scrollX, data, onSubmit, index}) => {
  return (
    <View style={styles.container}>
      {data.map((itemdata, i) => {
        const transform = [
          {
            translateX: index === 0 ? 0 : -width * index,
          },
        ];
        const inputRange = data.map((_, i) => i * width);
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: data.map(DATAONBOARDINGi => DATAONBOARDINGi.color),
        });
        return (
          <Animated.View
            key={i}
            style={[styles.containerTextFooter, transform]}>
            <Text style={[styles.sub]}>{itemdata.label}</Text>
            <Text style={styles.desc}>{itemdata.desc}</Text>
            {itemdata.last ? (
              <View style={styles.conatinerBottom}>
                <TouchableOpacity
                  onPress={onSubmit}
                  hitSlop={{
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                  }}>
                  <View style={styles.donebtn}>
                    <Text style={styles.textstylebtndone}>continue</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.stylebtnskip}
                activeOpacity={1}
                onPress={() => alert('')}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                <Animated.Text
                  style={[styles.textstylebtn, {color: backgroundColor}]}>
                  SKIP
                </Animated.Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
};

export default Wordinganimated;
