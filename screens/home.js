import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions,SectionList, TouchableOpacity, ImageBackground, RefreshControl, Button} from 'react-native';
import detailView from './detail';
import {createStackNavigator} from '@react-navigation/stack';
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



function homeScreen(props)  {
    const [content, setContent] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect( () => {
      fetch('http://eventregistry.org/api/v1/article/getArticlesForTopicPage?uri=6915b75b-011e-4572-9fad-014860138af5&dataType=news&resultType=articles&articlesCount=10&articlesSortBy=date&articleBodyLen=-1&apiKey=403be9f7-e4ec-4921-9731-760931ded360')
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
      return () => clearInterval();
      // setContent({hello: "name"});
      // console.log(content)
      
    },[]);
    // AsyncStorage.setItem(
    //   'storedData',
    //   JSON.stringify(content),
    // )
    // AsyncStorage.getItem(
    //   'storedData',
    //   (err,result) => {
    //     console.log(result);
    //   }
    // )
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetch('http://eventregistry.org/api/v1/article/getArticlesForTopicPage?uri=6915b75b-011e-4572-9fad-014860138af5&dataType=news&resultType=articles&articlesCount=10&articlesSortBy=date&articleBodyLen=-1&apiKey=403be9f7-e4ec-4921-9731-760931ded360')
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
      style={{backgroundColor:"#282828"}} //282828
      onSwipeableOpen = {
      () => {
          console.log("swipe is working!")
      }
      }
      refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
  >   
      <News content={content} navigation={props.navigation}/>
      </ScrollView>
      
       
    )
  }
const stack =  createStackNavigator();
function lightMode(){
  console.log("light Mode")
}
function DetailStack() {
  return (
    
    <stack.Navigator >
      <stack.Screen name='News App' component={homeScreen}
        options= {{
          title: "News App",
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            return (
              <View style={styles.HeaderStyles}>
                <Text style={{flex:7,fontSize: 20,fontFamily:"Numans-Regular",textAlign: "center",color:"white"}}> {options.title} </Text>
                <FontAwesome5 style={{flex:1,position:"relative",right:0}} onPress={lightMode} name="moon" size={20} color={"white"} />
                
                {/* <FontAwesome5 name="moon" color="black" size="20" /> */}
              </View>
            )
          },
          // headerStyle : {
          //   backgroundColor : "#282828",
          //   //marginLeft : 60,
          //   //fontFamily : "Numans-Regular",
          // },
          // //headerTransparent : "true",
          // headerTintColor : "white",
          // headerTitle: "News App",
        }}
      />
      <stack.Screen name='Back' component={detailView}
        options = {{
          title: "Back",
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            return (
              <View style={styles.HeaderStyles}>
                <FontAwesome5 style={{flex:1,marginLeft:20,fontSize: 20,fontFamily:"Numans-Regular",textAlign: "left",color:"white"}} onPress={() => navigation.goBack()} name="arrow-left" size={20} color={"white"} />
                <Text style={{flex:7,fontSize: 20,fontFamily:"Numans-Regular",textAlign: "left",color:"white"}}> {options.title} </Text>
                <FontAwesome5 style={{flex:1,position:"relative",right:0}} onPress={lightMode} name="moon" size={20} color={"white"} />
                
                {/* <FontAwesome5 name="moon" color="black" size="20" /> */}
              </View>
            )
          }
        }}
      />
    </stack.Navigator>
  )
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
  HeaderStyles: {
    //flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    //height: 100,
    backgroundColor: "#282828",
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
// const AppContainer = createAppContainer(RootStack);
export default class HomeView extends React.Component {
  render() {
    return (
        <DetailStack/>
    )
  }
}
