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
  Animated,StatusBar
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SignatureScreen from 'react-native-signature-canvas';

const {width, height} = Dimensions.get('window');
const imgw = width * 0.7;
const imgh = imgw * 1.54;

const HomeScreen = ({navigation}) => {
  const [randomUser, setRandomUser] = React.useState([]);
  const [signature, setSignature] = React.useState(null);
  const sigRef = React.useRef();

  React.useEffect(async () => {
    let isMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
      if (isMounted) {
        // getUser();
      }
      return () => {
        isMounted = false;
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

 const handleSignature = signature => {
    console.log(signature);
    setSignature(signature);
  };

 const handleEmpty = () => {
    console.log('Empty');
    setSignature(null)
  }

  const handleOK = (signature) => {
    console.log(signature);
    setSignature(signature)
  };

  return (
    <LinearGradient
    //  ref = {sigRef}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#232526', '#414345']}
      style={{flex: 1}}>
      <View style={{width:wp("100%"), height:hp("40%"), backgroundColor:'#FFFF'}}>
      {signature && (
          <Image style={{width:325, height:250}} source={{uri: signature}} />
        )}
        </View>
      <View style={{width: wp('100%'), height:hp('50%'), alignSelf:'center'}}>
        <SignatureScreen onOK={handleOK} onClear={handleEmpty} autoClear={true} />
      </View>
    </LinearGradient>
  );
};
export default HomeScreen;
