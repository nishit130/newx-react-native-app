/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
// import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HomeView from './screens/home';
import sportScreen from './screens/sports';
import settingsScreen from './screens/settings';
import detailView from './screens/detail';
import registerScreens from './screens/register';
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

//registerScreens();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions= {{
        inactiveBackgroundColor: '#4D4A4A',
        activeTintColor : 'cyan',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#4D4A4A',
      }}
    
    >
      <Tab.Screen 
        name="Home" 
        component={HomeView} 
        options = {{
          tabBarLabel: "Home",
          tabBarIcon : ({color,size}) => (
            <FontAwesome5  name="newspaper" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name="Sports" 
        component={sportScreen} 
        options = {{
          tabBarLabel: 'sports',
          tabBarIcon : ({color,size}) => (
            <FontAwesome5 name="table-tennis" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name="settings" 
        component={settingsScreen} 
        options = {{
          tabBarLabel : "Offline",
          tabBarIcon : ({color,size}) => (
            <FontAwesome5 name="download" color={color} size={size} />
          )
        }}
        />
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
