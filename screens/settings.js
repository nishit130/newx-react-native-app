import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
 
export default class settingsScreen extends Component {
  render() {
    return (
       <View style={{height:200,width:200,margin:50,backgroundColor: "rgb(252,252,252)",borderRadius:21,shadowColor: "rgb(242,200,150)",
       shadowOffset: {
        width: 20,
        height: 20,
      },
      shadowOpacity: 0.8,
      shadowRadius: 21,
      elevation: 12,}} >
           <Text>
               settings SCREEN
           </Text>
       </View>
    )
  }
}