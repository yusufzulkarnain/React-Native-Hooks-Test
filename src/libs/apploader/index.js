
 import React, {Component} from 'react';
import { Platform, View, Linking, BackHandler, Text, Image, TouchableHighlight } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';

 export default class AppLoader extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
        firstOpen: false,
        playerId:'',
        islogin: false,
        valueId:'',
        role:''
      }
   }

   UNSAFE_componentWillMount() {
       
   }

   render() {
     return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#232526', '#414345']} style={{ flex: 1, justifyContent:'center' }}>
           <Image source={require("../.././res/icon/globe.gif")} style={{width:250, height:250, alignSelf:'center'}} resizeMode={'cover'}/>
       </LinearGradient>
     );
   }
 }
