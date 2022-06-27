import * as React from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  Animated,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import SlideOnBoarding, {SLIDE_HIGHT} from './slideOnboarding';
import ContentOnboarding from './ContentOnboarding';
import Pagination from './Pagination';
import DATAONBOARDING from '../../res/DummyData/DataOnBoarding';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  slider: {
    height: SLIDE_HIGHT,
    backgroundColor: 'cyan',
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
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
    width: width,
    height: SLIDE_HIGHT,
    // backgroundColor: 'red',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
  },
});

const OnBoarding = ({onSubmit}) => {
  const {width, height} = Dimensions.get('window');
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slideRef = React.useRef(null);
  const [currentIndex, SetCurrentIndex] = React.useState(0);
  const inputRange = DATAONBOARDING.map((_, i) => i * width);
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: DATAONBOARDING.map(DATAONBOARDINGi => DATAONBOARDINGi.color),
  });
  React.useEffect(() => {}, [currentIndex]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          styles.slider,
          {
            backgroundColor: backgroundColor,
          },
        ]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onMomentumScrollEnd={e => {
            let contentOffset = e.nativeEvent.contentOffset;
            let viewSize = e.nativeEvent.layoutMeasurement;
            let pageNum = Math.floor(contentOffset.x / viewSize.width);
            SetCurrentIndex(pageNum);
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {x: scrollX}},
              },
            ],
            {useNativeDriver: false},
          )}
          ref={slideRef}>
          {DATAONBOARDING.map((item, i) => {
            const inputRange = [
              (i - 0.5) * width,
              i * width,
              (i + 0.5) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });
            return (
              <SlideOnBoarding
                key={i}
                label={item.label}
                right={item.right}
                image={item.image}
                opacity={opacity}
                data={DATAONBOARDING}
              />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: backgroundColor,
          }}>
          <Pagination data={DATAONBOARDING} scrollX={scrollX} />
          <Animated.View style={[styles.containerFooter]}>
            <ContentOnboarding
              data={DATAONBOARDING}
              scrollX={scrollX}
              index={currentIndex}
              onSubmit={onSubmit}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default OnBoarding;
