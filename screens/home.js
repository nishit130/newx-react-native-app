import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions,SectionList, TouchableOpacity, PermissionsAndroid, RefreshControl, Button, Appearance, Image} from 'react-native';
import detailView from './detail';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import AsyncStorage from '@react-native-community/async-storage'
// import {createAppContainer} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import {PanResponder, Animated} from 'react-native'
import News from '../component/news'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


// import JSON;


// color for bottom tab navigator : #4D4A4A

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const colorScheme = Appearance.getColorScheme();

const requestCameraPermission = async () => {
  PermissionsAndroid.check("android.permission.INTERNET").then((e) => console.log(e))
  try {
    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE])
  } catch (err) {
    console.warn(err);
  }
};

function homeScreen(props)  {
    const [content, setContent] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [colorScheme ,setcolorScheme] = React.useState("");
    const [darkMode, setDarkmode] = React.useState("false");
    const [textColor, setTextColor] = React.useState("black")


    React.useEffect( () => {
      fetch('news_api')
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson.articles.results)
          setContent(responseJson.articles.results);
          //setData([1,2,3,4])
          console.log("ran use effects")
        })
      .catch((error) => {
        console.error(error);
      });
      AsyncStorage.getItem("darkMode").then((u) => setDarkmode(u)).then(() => {
        if(darkMode == "true")
        {
          setcolorScheme("#C4C1C1");
          setTextColor("black");
          setDarkmode("false");
          AsyncStorage.setItem("darkMode", "false")
          console.log("Dark mode");
        }
        else
        {
          setcolorScheme("#282828");
          setTextColor("white");
          setDarkmode("true")
          AsyncStorage.setItem("darkMode", "true")
          console.log("light mode");
        }
      }).catch(() => {
        if(colorScheme == "dark")
        {
          setcolorScheme("#282828");
          setTextColor("white");
          setDarkmode("true")
          AsyncStorage.setItem("darkMode", "true")
          console.log("light mode");
        }
        else
        {
          setcolorScheme("#C4C1C1");
          setTextColor("black");
          setDarkmode("false");
          AsyncStorage.setItem("darkMode", "false")
          console.log("Dark mode");
        }
        console.log("no saved data");
        
      })
      return () => clearInterval();
      // setContent({hello: "name"});
      // console.log(content)
      
    },[]);
    function lightMode(){
      if(darkMode == "true")
      {
        setcolorScheme("#C4C1C1");
        setTextColor("black");
        setDarkmode("false");
        AsyncStorage.setItem("darkMode", "false")
        console.log("Dark mode");
      }
      else
      {
        setcolorScheme("#282828");
        setTextColor("white");
        setDarkmode("true")
        AsyncStorage.setItem("darkMode", "true")
        console.log("light mode");
      }
      
    }
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      requestCameraPermission()
      fetch('news_api')
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson.articles.results)
          setContent(responseJson.articles.results);
          //setData([1,2,3,4])
          //onsole.log("ran use effects")
        })
      .catch((error) => {
        console.error(error);
      });
      console.log("refreshing");
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);


    console.log("hello from home screen")
    // const { navigate } = props.navigation
    return (
      <ScrollView 
      style={{backgroundColor:colorScheme}} //282828
      onSwipeableOpen = {
      () => {
          console.log("swipe is working!")
      }
      }
      refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
  >   
      <View style={[styles.HeaderStyles, {backgroundColor : colorScheme}]}>
        <Image style={{flex:1,top:0,marginLeft:10,height:35,width:35}} source={require('../assets/fonts/images/logo_round.png')}/>
        <Text style={{flex:7,fontSize: 20,fontFamily:"Numans-Regular",textAlign: "center",color:textColor,fontWeight:"400"}}> NewsX </Text>
        <FontAwesome5 style={{flex:1,position:"relative",right:0}} onPress={lightMode} name="moon" size={20} color={textColor} />  
      </View>
      <News key={darkMode} heading={"Headlines"} banner={true} content={content} navigation={props.navigation}/>
      </ScrollView>
      
       
    )
  }
  
const stack =  createSharedElementStackNavigator();

function DetailStack() {
  return (
    
    <stack.Navigator 
      headerMode= "none"
    >
      <stack.Screen name='News App' component={homeScreen}
        options= {{
          title: "News App",
        }}
      />
      <stack.Screen name='Back' component={detailView}
        sharedElements={(route, otherRoute, showing) => {
          return [route.params.content.uri];
        }}
        options = {{
          title: "Back",
          headerTransparent:true,
          cardStyleInterpolator: ({current : {progress}}) => {
              return {cardStyle : { opacity : progress}}
          },
        }}
      />
    </stack.Navigator>
  )
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
  HeaderStyles: {
    //flex:10,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: "row",
    //height: 100,
    //zIndex:2,
  },
  headingText: {
    margin: 10,
    marginLeft: 30,
    fontSize : 27,
    fontFamily: "Numans-Regular",
  },
  visibleArea : {
    top:0,
    width : width,
    height: 168,
    zIndex: -1,
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
    top:0,
    //marginTop: 8,
    height: 158,
    shadowColor: 'blue',
    shadowOpacity: 0.3,
    elevation: 50,
    zIndex: -1,


  },
  itemsImage: {
    width : width- 16,
    height: 158,
    top:0,
    // zIndex: -1,

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
// const AppContainer = createAppContainer(RootStack);
export default class HomeView extends React.Component {
  render() {
    return (
        <DetailStack/>
    )
  }
}
