import React, { Component } from 'react';
import { StyleSheet, View,Image, Text, ScrollView , Dimensions,ToastAndroid, TouchableOpacity, ImageBackground, RefreshControl} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage'
// import {createAppContainer} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import {PanResponder, Animated} from 'react-native'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { ThemeConsumer } from 'styled-components';
import News from "./news" 

export default class Bookmarklist extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : new Array(),
      prevProps: [],
      prevState: [],
      darkMode : "",
      bgColor : "",
      textcolor : "",
    }
    
    console.log("data recived in bookmark: ",this.props.data);
    AsyncStorage.getAllKeys((err,keys) => {
    }).then(keys => {
      AsyncStorage.multiGet(keys,(err,stores) => {
        let arr = new Array();
        let joined = new Array();
        stores.map((result,i,store) => {
          //console.log(store[i][1])
          arr.push(JSON.parse(store[i][1]));
          joined = this.state.data.concat(arr);
          
        })
        this.setState({data : arr})
      })
    })

  }
  componentDidMount(){
    //AsyncStorage.clear()
    AsyncStorage.getAllKeys((err,keys) => {
    }).then(keys => {
      AsyncStorage.multiGet(keys,(err,stores) => {
        let arr = new Array();
        let joined = new Array();
        stores.map((result,i,store) => {
          //console.log(store[i][1])
          arr.push(JSON.parse(store[i][1]));
          joined = this.state.data.concat(arr);
        })
        this.setState({data : arr})
      })
    })
    ToastAndroid.show("Refresh to get latest Bookmarks", ToastAndroid.SHORT)
    console.log("bookmarks mounted!")
    console.log("data recived in bookmark: ",this.props.data);

  }

  shouldComponentUpdate(nextprops,state){

      console.log("data length ",this.state.data.length)
    if(this.props != nextprops)
    {
      AsyncStorage.getAllKeys((err,keys) => {
      }).then(keys => {
        AsyncStorage.multiGet(keys,(err,stores) => {
          let arr = new Array();
          let joined = new Array();
          stores.map((result,i,store) => {
            //console.log(store[i][1])
            arr.push(JSON.parse(store[i][1]));
            joined = this.state.data.concat(arr);
            
          })
          this.setState({data : arr})
        })
      })
      return true;
    }
    else{
      return false;
    }
  }


  render() {


    return (                    
          <News key={1} banner={false} heading={"Bookmarks"} content={this.state.data} navigation={this.props.navigation} />          
    )
  }
}


var width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({


  child : {
    backgroundColor: "blue",
  },
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
  topText: {
    //flex : 1,
    bottom: 0,
    backgroundColor :"rgba(212,212,180,0.5)", 
    fontSize: 20,
    marginTop : 100,
    marginBottom : 0,
    paddingLeft : 20,
    fontFamily : "sans-serief",
    fontWeight :"bold",
    textAlignVertical:"bottom",
  },
  items : {
    width : width- 16,
    //borderWidth: 2,
    marginLeft : 8,
    marginRight: 8,
    marginTop: 8,
    borderRadius: 21,
    height: 158,
    shadowColor: 'blue',
    shadowOpacity: 0.3,
    elevation: 50,

  },
  
  itemsImage: {
    width : width- 16,
    height: 158,
    borderRadius: 21,
  },
  headingBanner: {
    fontSize: 25,
    marginLeft: 30,
    color: 'white',
    // marginTop:0,
    fontFamily: "Numans-Regular",

  },
  headlines:{
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    // box-shadow: 
    // 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    // -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
    //bac
    //opacity: 0.5,
    //backgroundColor : 'rgba(0,0,0,0.1)',
    width : width- 16,
    height: 137,
    //borderWidth: 2,
    marginLeft : 8,
    marginRight: 8,
    marginTop: 13,
    borderRadius : 21,
    //overlayColor : '#282828',
    backgroundColor: "#C3C1C1",
  },
  headlinesText: {
    fontSize: 20,
    marginLeft: 20,
    marginTop : 10,
    borderRadius: 21,
    fontFamily : "sans-serief",
    fontWeight: "bold",
    //height: 137,
    //backgroundColor: "rgba(0, 0, 15, 0.5)"
  },
  publisher: {
    marginLeft: width - 180,
    fontSize: 16,
    color: "#423F3F",
    marginTop: 10,
  }
})
