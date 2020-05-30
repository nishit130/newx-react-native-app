import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions,SectionList, TouchableOpacity, ImageBackground, RefreshControl, PickerIOSComponent} from 'react-native';
import detailView from './detail';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage'
// import {createAppContainer} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import {gestureHandlerRootHOC} from "react-native-gesture-handler"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {PanResponder, Animated} from 'react-native'
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

    const leftActions = () => {
      <View>
        <Text>
          Bookmarks
        </Text>
      </View>
    }

    function onSwipeLeft(gestureState) {
      console.log("swiped left");
    }
    
    function onSwipe(gestureName, gestureState){
      const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
      //this.setState({gestureName: gestureName});
      switch (gestureName) {
        case SWIPE_UP:
          console.log("swipe!")
          break;
        case SWIPE_DOWN:
          console.log("swipe!")
          break;
        case SWIPE_LEFT:
          console.log("swipe!")
          break;
        case SWIPE_RIGHT:
          console.log("swipe!")
          break;
      }
    }
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    
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
      //setContent(19);
      //console.log(content);

      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    console.log("hello from home screen")
    const { navigate } = props.navigation
    return (
      <>
      <Swipeable renderLeftActions={leftActions}>
                  <Text style={{height:100,backgroundColor:'pink'}}>swipe</Text>
      </Swipeable>
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
       <View  style={styles.visibleArea}>
         <ScrollView 
          horizontal={true}
          contentContainerStyle={{ width: `400%` }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          >
            {
              content.map((u, i) => {
                if(u.image)
                {
                  return (
                    <View key={i} style={styles.items}>
                      <ImageBackground style={styles.itemsImage} imageStyle={{borderRadius:21}} source={{uri:u.image }}>
                        <TouchableOpacity onPress={() => navigate('Back',{content: u.body ,title: u.title,image : u.image})}>
                          <Text style={styles.topText}>{u.title}</Text>
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  );
                }
              })
          }
         </ScrollView>
       </View>
       <Text style={styles.headingBanner}>
        Headlines
       </Text>
       {
         //console.log(data)
          content.map((u, i) => {
            if(u.image && i > 4) 
            {
              return (
                // <Swipeable 
                //   key={i}
                //   renderLeftActions={leftActions}
                // >
                
                  <ImageBackground  imageStyle={{ borderRadius: 21,opacity:0.4}}
                  source={{uri : u.image}} style={styles.headlines}>
                    <TouchableOpacity onPress={() => navigate('Back',{content: u.body ,title: u.title,image : u.image})}>
                        <Text style={styles.headlinesText}>
                          {u.title}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.publisher}>
                        {u.source.title}
                      </Text>
                  </ImageBackground>
                //</Swipeable>
              );
            }
          })
          }
                
       </ScrollView>
       </>
       
    )
  }
const stack =  createStackNavigator();
function DetailStack() {
  return (
    
    <stack.Navigator>
      <stack.Screen name='News App' component={homeScreen}
        options= {{
          headerStyle : {
            backgroundColor : "#282828",
            //marginLeft : 60,
            //fontFamily : "Numans-Regular",
          },
          //headerTransparent : "true",
          headerTintColor : "white",
          headerTitle: "News App",
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
