import React, { Component } from 'react';
import { StyleSheet, View,Image, Text, ScrollView , Dimensions,SectionList, TouchableOpacity, ImageBackground, RefreshControl} from 'react-native';
import detailView from '../screens/detail';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage'
// import {createAppContainer} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import {PanResponder, Animated} from 'react-native'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Bookmarklist from '../component/bookmark';



function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}



function settingView(props) {
  
  const [content, setContent] = React.useState([]);
  const [darkMode, setdarkMode] = React.useState([])
  let content2= [];
  const [refreshing, setRefreshing] = React.useState(false);
  const [bgcolor,setbgcolor] = React.useState(" ");
  const _isMounted = React.useRef(true);
  
  
React.useEffect(  () => {
    AsyncStorage.getAllKeys().then((keys) => setContent(keys))
    //setContent(key)
    AsyncStorage.getItem("darkMode").then((value) => {
      setdarkMode(value)
      if(value == "true")
      {
        setbgcolor("#282828");
      }
      else{
        setbgcolor("#C3C2C2")
      }
      
    })
      //setKeys(key)
      //console.log("he");
      
      //console.log("ran effect sport");
      
    //});
    return () => { // ComponentWillUnmount in Class Component
      _isMounted.current = false;
  }
    // setContent({hello: "name"});
    //console.log(keys)
    
  },[]);
  //console.log(`"content from main file: ${content}`)
    // AsyncStorage.getAllKeys((err,keys) => {
    // }).then(keys => {
    //   AsyncStorage.multiGet(keys,(err,stores) => {
    //     stores.map((result,i,store) => {
    //       //console.log(store[i][1])
    //       var arr = new Array();
    //       arr.push(JSON.parse(store[i][1]));
    //       var joined = this.state.data.concat(arr);
    //       this.setState({data : joined})
    //     })
    //   })
    // })
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      let key = await AsyncStorage.getAllKeys()
      setContent(key)
      console.log("refreshing", content);
      AsyncStorage.getItem("darkMode").then((value) => {
        setdarkMode(value);
        if(value == "true")
        {
          setbgcolor("#282828");
        }
        else{
          setbgcolor("#C3C2C2")
        }
        
      })
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
  // componentDidMount(){
  //   //AsyncStorage.clear()
  //   AsyncStorage.getAllKeys((err,keys) => {
  //   }).then(keys => {
  //     AsyncStorage.multiGet(keys,(err,stores) => {
  //       stores.map((result,i,store) => {
  //         //console.log(store[i][1])
  //         var arr = new Array();
  //         arr.push(JSON.parse(store[i][1]));
  //         var joined = this.state.data.concat(arr);
  //         this.setState({data : joined})
  //       })
  //     })
  //   })
  // }

    
    //console.log(content2)
    return (
      
       <ScrollView 
        style={{backgroundColor:bgcolor}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
         <Bookmarklist key={darkMode}  data={content} navigation={props.navigation}/>
       </ScrollView>
    );
  }

const stack =  createStackNavigator();
function DetailStack() {
  return (
    
    <stack.Navigator headerMode="none">
      <stack.Screen name='Bookmarks' component={settingView}
        options= {{
          headerStyle : {
            backgroundColor : "#282828",
            //marginLeft : 60,
            //fontFamily : "Numans-Regular",
          },
          //headerTransparent : "true",
          headerTintColor : "white",
          headerTitle: "Bookmarks",
        }}
      />
      <stack.Screen name='Back' component={detailView}
        options = {{
          headerStyle : {
            backgroundColor : "#282828",
          },
          headerTintColor : "white",
        }}
      />
    </stack.Navigator>
  )
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

export default class settingsScreen extends React.Component {
  render() {
    return (
        <DetailStack/>
    )
  }
}
