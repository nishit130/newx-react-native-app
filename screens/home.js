import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions, Image, TouchableOpacity, ImageBackground, RefreshControl} from 'react-native';
import detailView from './detail';
import {createStackNavigator} from '@react-navigation/stack';

// import {createAppContainer} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native/Libraries/NewAppScreen';
// import JSON;


// color for bottom tab navigator : #4D4A4A
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
function homeScreen(props)  {


  // constructor(props){
  //   super(props);
  //   this.state = {
  //     isloading : true,
  //     data : [],
  //   }
    var intialValue = [
      {

      },
      {

      }
    ]
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
    //console.log(content)
     // expected output: 'resolved'
  // componentDidMount(){
  //   return fetch('http://eventregistry.org/api/v1/article/getArticlesForTopicPage?uri=6915b75b-011e-4572-9fad-014860138af5&dataType=news&resultType=articles&articlesCount=10&articlesSortBy=date&articleBodyLen=-1&apiKey=403be9f7-e4ec-4921-9731-760931ded360')
  //     .then((response) => response.json())
  //     .then(async(responseJson) => {
  //       //console.log(responseJson)
  //       this.setState({
  //         isloading : false,
  //         data: responseJson.articles.results,
  //       }, function(){
  //           console.log("API SUCESS")
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetch('http://eventregistry.org/api/v1/article/getArticlesForTopicPage?uri&dataType=news&resultType=articles&articlesCount=10&articlesSortBy=date&articleBodyLen=-1&apiKey=')
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
      console.log("refreshing");
      //setContent(19);
      //console.log(content);

      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    console.log("hello from home screen")
    const { navigate } = props.navigation
    return (
      <ScrollView 
        style={{backgroundColor:"#282828"}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
       <View  style={styles.visibleArea}>
         <ScrollView 
          horizontal={true}
          contentContainerStyle={{ width: `300%` }}
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
            if(u.image && i > 2) 
            {
              return (
                <ImageBackground key={i}   imageStyle={{ borderRadius: 21,opacity:0.4}}
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
              );
            }
          })
          }
       </ScrollView>
       
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
    backgroundColor :"rgba(0,0,0,0)", 
    fontSize: 20,
    marginLeft : 20,
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
