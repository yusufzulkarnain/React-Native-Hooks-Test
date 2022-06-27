import React from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { StackActions, NavigationActions } from 'react-navigation'
//V4
// import { createAppContainer } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { createStackNavigator } from 'react-navigation-stack';
// V5
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../../screens/Home/index';
import IntroScreen from '../../screens/intro/index';
import ProfileScreen from '../../screens/Profile/index';
import SettingScreen from '../../screens/Setting/index';
import FavoriteScreen from '../../screens/Favorite/index';
import DetailScreen from '../../screens/Detail/index';
import ViewScreen from '../../screens/View/index';
import StoreScreen from '../../screens/Store/index';
import AppLoader from '../../libs/apploader/index';
import DetailScreen2 from '../../screens/DetailList/index';
import CameraScreen from '../../screens/Camera/index';
import DragSortListScreen from '../../screens/Maps/index';
import SignatureScreen from '../../screens/Signature';

// const HomeStack2 = createStackNavigator(
//     {
//         Home: {
//             screen: HomeScreen,
//             navigationOptions: ({ navigation }) => ({
//                 // headerTitle:()=>(<Text>jjkjkjk</Text>) ,
//                 headerTintColor: 'white',
//                 headerStyle: {
//                     backgroundColor: 'white',
//                     elevation: 0,
//                     shadowColor: 'transparent',
//                     borderBottomWidth: 0.5, paddingHorizontal: 16
//                 },
//                 headerTitleStyle: {
//                     alignSelf: 'center',
//                     textAlign: "center",
//                     justifyContent: 'center',
//                     flex: 1,
//                     fontWeight: 'bold',
//                     textAlignVertical: 'center'
//                 },
//                 headerLeft: () => (<TouchableOpacity style={{ paddingHorizontal: 16 }}>
//                     <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>FeatureApp</Text>
//                 </TouchableOpacity>
//                 ),
//                 headerRight: () => (<TouchableOpacity onPress={() => null} style={{ paddingHorizontal: 16 }}>
//                     <Image source={require("../../send.png")} resizeMode={'contain'} style={{ width: 20, height: 20, marginTop: 2, }} />
//                     <View style={{ justifyContent: 'center', position: 'absolute', bottom: 0, left: 5, backgroundColor: '#f75959', borderRadius: 20, width: 18, height: 18 }}>
//                         <Text style={{ alignSelf: 'center', fontSize: 11, fontWeight: 'bold' }}>1</Text>
//                     </View>

//                 </TouchableOpacity>
//                 ),
//             })
//         },
//         Detail: {
//             screen: DetailScreen,
//             navigationOptions: ({ navigation }) => ({
//                 tabBarVisible : false,
//                 // headerTitle:()=>(<Text>jjkjkjk</Text>) ,
//                 headerTintColor: 'white',
//                 headerStyle: {
//                     backgroundColor: 'white',
//                     elevation: 0,
//                     shadowColor: 'transparent',
//                     borderBottomWidth: 0.5, paddingHorizontal: 16
//                 },
//                 headerTitleStyle: {
//                     alignSelf: 'center',
//                     textAlign: "center",
//                     justifyContent: 'center',
//                     flex: 1,
//                     fontWeight: 'bold',
//                     textAlignVertical: 'center'
//                 },
//                 headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('View')} style={{ paddingHorizontal: 16 }}>
//                     <Image source={require("../../back.png")} resizeMode={'contain'} style={{ width: 20, height: 20, marginTop: 2, }} />
//                 </TouchableOpacity>
//                 ),
//             })
//         },
//         View: {
//             screen: ViewScreen, navigationOptions: ({ navigation }) => ({
//                 // headerTitle:()=>(<Text>jjkjkjk</Text>) ,
//                 headerTintColor: 'white',
//                 headerStyle: {
//                     backgroundColor: 'white',
//                     elevation: 0,
//                     shadowColor: 'transparent',
//                     borderBottomWidth: 0.5, paddingHorizontal: 16
//                 },
//                 headerTitleStyle: {
//                     alignSelf: 'center',
//                     textAlign: "center",
//                     justifyContent: 'center',
//                     flex: 1,
//                     fontWeight: 'bold',
//                     textAlignVertical: 'center'
//                 },
//                 headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ paddingHorizontal: 16 }}>
//                     <Image source={require("../../back.png")} resizeMode={'contain'} style={{ width: 20, height: 20, marginTop: 2, }} />
//                 </TouchableOpacity>
//                 ),
//             })
//         },
//     },
//     { initialRouteName: 'Home' }
// );

// const BottomBar = createMaterialBottomTabNavigator({
//     Home: {
//         screen: HomeStack2,
//         navigationOptions: {
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ tintColor }) => (
//                 <View>
//                     <Image style={{ color: tintColor, tintColor: tintColor, width: 18, height: 18 }} source={require("../../home.png")} resizeMode={'contain'} />
//                 </View>
//             )
//         }
//     },
//     Favorite: {
//         screen: FavoriteScreen,
//         navigationOptions: {
//             tabBarLabel: 'Favorite',
//             tabBarIcon: ({ tintColor }) => (
//                 <View>
//                     <Image style={{ color: tintColor, tintColor: tintColor, width: 18, height: 18 }} source={require("../../heart.png")} resizeMode={'contain'} />
//                 </View>
//             )
//         }
//     },
//     Profile: {
//         screen: ProfileScreen,
//         navigationOptions: {
//             tabBarLabel: 'Profile',
//             tabBarIcon: ({ tintColor }) => (
//                 <View>
//                     <Image style={{ color: tintColor, tintColor: tintColor, width: 18, height: 18 }} source={require("../../user.png")} resizeMode={'contain'} />
//                 </View>
//             )
//         }
//     },
//     Setting: {
//         screen: SettingScreen,
//         navigationOptions: {
//             tabBarLabel: 'Setting',
//             tabBarIcon: ({ tintColor }) => (
//                 <View>
//                     <Image style={{ color: tintColor, tintColor: tintColor, width: 18, height: 18 }} source={require("../../settings.png")} resizeMode={'contain'} />
//                 </View>
//             ),
//         }
//     },
// },
//     {
//         initialRouteName: 'Home',
//         activeColor: '#a9abaa',
//         inactiveColor: '#a9abaa',
//         barStyle: {
//             backgroundColor: 'white', position: 'absolute',
//             overflow: 'hidden',
//             display:'none',
//             borderTopLeftRadius: 30,
//             borderTopRightRadius: 30, shadowColor: "#808080",
//             shadowOffset: {
//                 width: 2,
//                 height: -20,
//             },
//             shadowOpacity: 2,
//             shadowRadius: 2.46,
//             elevation: 4,
//             borderWidth: 0.4, borderColor: '#a9abaa'
//         },

//     }
// )

const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
const TopBar = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator();
const StakStore = createStackNavigator();
const Tab = createBottomTabNavigator();

const StoreStack = () => {
  return (
    <StakStore.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation
            .dangerouslyGetState()
            .routes.findIndex(r => r.key === route.key) > 0
            ? 0
            : undefined,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      })}>
      <StakStore.Screen
        name="Store"
        component={StoreScreen}
        options={{
          headerTitleStyle: {fontFamily: 'stocky', paddingHorizontal: 16},
          headerBackTitle: ' ',
          headerTintColor: 'white',
        }}
      />
      <StakStore.Screen
        name="DetailList"
        component={DetailScreen2}
        options={{
          headerTitleStyle: {fontFamily: 'stocky', paddingHorizontal: 16},
          headerBackTitle: ' ',
          headerTintColor: 'white',
        }}
      />
    </StakStore.Navigator>
  );
};

const TopBars = () => {
  return (
    <TopBar.Navigator
      initialRouteName="Store"
      tabBarOptions={{
        labelStyle: {fontSize: 14, fontWeight: '700', color: 'white'},
        style: {marginTop: StatusBar.currentHeight || 42},
        activeTintColor: '#1667E3',
      }}>
      <TopBar.Screen
        name="Store"
        component={StoreStack}
        options={{
          tabBarLabel: 'Popular',
        }}
      />
      <TopBar.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          tabBarLabel: 'Store',
        }}
      />
    </TopBar.Navigator>
  );
};
const HomeStacks = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation
            .dangerouslyGetState()
            .routes.findIndex(r => r.key === route.key) > 0
            ? 0
            : undefined,
        ...TransitionPresets.RevealFromBottomAndroid,
      })}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: null,
          headerLeft: props => (
            <View style={{paddingLeft: 16}}>
              <Text
                style={{fontSize: 20, color: 'white', fontFamily: 'stocky'}}>
                FeatureApp
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => null}
              style={{paddingHorizontal: 16}}>
              <Image
                source={require('../.././res/icon/send.png')}
                resizeMode={'contain'}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 2,
                  tintColor: '#1667E3',
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 6,
                  left: 7,
                  backgroundColor: '#f75959',
                  borderRadius: 6,
                  width: 12,
                  height: 12,
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />

      <HomeStack.Screen
        name="View"
        component={ViewScreen}
        options={{
          headerTitleStyle: {fontFamily: 'stocky', paddingHorizontal: 16},
          headerBackTitle: ' ',
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerTitleStyle: {fontFamily: 'stocky', paddingHorizontal: 16},
          headerBackTitle: ' ',
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerTitleStyle: {fontFamily: 'stocky', paddingHorizontal: 16},
          headerBackTitle: ' ',
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="Maps"
        component={DragSortListScreen}
        options={{
          headerTitleStyle: {fontFamily: 'stocky', paddingHorizontal: 16},
          headerBackTitle: ' ',
          headerTintColor: 'white',
        }}
      />

      <HomeStack.Screen
        name="Signature"
        component={SignatureScreen}
        options={{
          headerTitleStyle: {fontFamily: 'stocky', paddingHorizontal: 16},
          headerBackTitle: ' ',
          headerTintColor: 'white',
        }}
      />
    </HomeStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#1667E3',
          showLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStacks}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home-outline" size={24} color={color} />
            ),
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Store"
          component={TopBars}
          options={{
            headerTitleStyle: {fontFamily: 'stocky'},
            tabBarIcon: ({color, size}) => (
              <Icon name="md-newspaper-outline" size={24} color={color} />
            ),
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitleStyle: {fontFamily: 'stocky'},
            tabBarLabel: '',
            tabBarIcon: ({color, size}) => (
              <Icon name="person-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerTitleStyle: {fontFamily: 'stocky'},
            tabBarLabel: '',
            tabBarIcon: ({color, size}) => (
              <Icon name="settings-outline" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
