import React, {Component} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');
// const imgw = width * 0.7
// const imgh = imgw * 1.54
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

export default class DetailListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appToken: '',
      email: '',
      password: '',
      loader: false,
      visiblePass: true,
    };

    // BackHandler.addEventListener('hardwareBackPress', this._onBackPress)
  }

  UNSAFE_componentWillMount() {}

  componentDidMount() {
    //  console.log(this.state.randNum)
    // alert(this.props.navigation.state.params.itemId)
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)
  }

  render() {
    const {navigation} = this.props;
    image = this.props.route.params.image;
    return (
      <ScrollView bounces={false} style={{flex: 1}}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', top: 16, left: 16, zIndex: 10}}>
            <Icon
              name="arrow-back-circle-outline"
              size={34}
              style={{color: 'white'}}
            />
          </TouchableOpacity>
          <Image source={{uri: image}} style={{width, height: height / 3}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderColor: 'white',
            padding: 16,
            borderBottomColor: 'gray',
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
              marginTop: 4,
            }}>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/women/63.jpg'}}
              style={{width: null, height: null, flex: 1, borderRadius: 40}}
              resizeMode={'cover'}
            />
          </LinearGradient>
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'justify',
                color: 'white',
                marginTop: 10,
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
                marginTop: 2,
              }}>
              {'Posted: 2 hour ago'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 'auto', padding: 10}}>
            <Image
              source={require('../.././res/icon/wishlist.png')}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
                tintColor: 'white',
                marginRight: 12,
              }}
            />
            <Image
              source={require('../.././res/icon/send.png')}
              resizeMode={'contain'}
              style={{width: 20, height: 20, tintColor: 'white'}}
            />
          </View>
        </View>
        <View style={{padding: 16}}>
          <Text
            style={{
              textAlign: 'justify',
              lineHeight: 18,
              fontSize: 14,
              color: 'white',
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  p: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginTop: 10,

    // color:"#fff"
  },
  font: {
    color: 'red',
  },
});
