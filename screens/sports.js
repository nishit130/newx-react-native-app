import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions, Image, TouchableOpacity} from 'react-native';
import detailView from './detail';
import {createStackNavigator} from '@react-navigation/stack';
import News from '../component/news'

// import {createAppContainer} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';



class sportsScreen extends React.Component  {

  
  render() {
    console.log("hello from sports screen")
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
       {/* <View>
           <Text style={styles.headingText}>
              News App
           </Text>
       </View> */}
       </ScrollView>

       
    )
  }
}
const stack =  createStackNavigator();
function DetailStack() {
  return (
    
    <stack.Navigator>
      <stack.Screen name='News App' component={sportsScreen}/>
      <stack.Screen name='Back' component={detailView}/>
    </stack.Navigator>
  )
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
  headingText: {
    margin: 10,
    marginLeft: 30,
    fontSize : 27,
    fontFamily: "Numans-Regular",
  },
  visibleArea : {
    width : width,
    height: 168,
  },
  items : {
    width : width- 16,
    //borderWidth: 2,
    marginLeft : 8,
    marginRight: 8,
    marginTop: 8,
    borderRadius: 21,
    height: 158,

  },
  itemsImage: {
    width : width- 16,
    height: 158,
    borderRadius: 21,
  },
  headingBanner: {
    fontSize: 25,
    marginLeft: 30,
    // marginTop:0,
    fontFamily: "Numans-Regular",

  },
  headlines:{
    width : width- 16,
    height: 137,
    //borderWidth: 2,
    marginLeft : 8,
    marginRight: 8,
    marginTop: 13,
    borderRadius: 21,
    backgroundColor: "#C3C1C1",
  },
  headlinesText: {
    fontSize: 20,
    marginLeft: 20,
    marginTop : 10,
  },
  publisher: {
    marginLeft: width - 180,
    fontSize: 16,
    color: "#423F3F",
    marginTop: 10,
  }
})
// const AppContainer = createAppContainer(RootStack);
export default class HomeView extends React.Component {
  render() {
    return (
      
        <DetailStack/>
    )
  }
}
