/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import AppContainer from './src/libs/appnavigator/index';
import AppLoader from './src/libs/apploader';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import IntroScreen from './src/screens/intro';
import AutContext from './context';
import OnBoarding from './src/libs/Component/OnBording';
export default function App() {
  const [isLoading, SetIsLoading] = React.useState(true);
  const [userToken, SetUserToken] = React.useState(null);
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, [userToken]);
  const onSubmit = () => {
    setTimeout(() => {
      SetUserToken('d');
    }, 800);
  };

  if (userToken != null) {
    return <AppContainer />;
  } else {
    return <OnBoarding onSubmit={onSubmit} />;
    // <IntroScreen onSubmit={onSubmit} />;
    // return <AppContainer />;
  }
}
