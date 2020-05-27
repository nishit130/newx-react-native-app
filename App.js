/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
// import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import HomeView from './screens/home';
import sportScreen from './screens/sports';
import settingsScreen from './screens/settings';
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


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions= {{
        activeTintColor : 'red',
        activeBackgroundColor: '#4D19AC',
      }}
    
    >
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Sports" component={sportScreen} />
      <Tab.Screen name="settings" component={settingsScreen} />
    </Tab.Navigator>
  );
}


const App: () => React$Node = () => {
  return (
      <NavigationContainer>
        <MyTabs/>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  custom : {
    flex :1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cyan',
  }
});

export default App;
