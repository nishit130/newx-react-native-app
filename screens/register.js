/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
// import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
// import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HomeView from './home';
import sportScreen from './sports';
import settingsScreen from './settings';
import detailView from './detail';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




export function registerScreens() {
    Navigation.registerComponent('newsapp.HomeView', () =>
      gestureHandlerRootHOC(HomeView));
    Navigation.registerComponent('newsapp.sportScreen', () =>
      gestureHandlerRootHOC(sportScreen));
    Navigation.registerComponent('newsapp.settingsScreen', () =>
      gestureHandlerRootHOC(settingsScreen));
    Navigation.registerComponent('newsapp.detailView',() =>
      gestureHandlerRootHOC(detailView));
  }