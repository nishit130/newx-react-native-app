import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions, Image, TouchableOpacity, ImageBackground} from 'react-native';
import detailView from './detail';
import {createStackNavigator} from '@react-navigation/stack';

// import {createAppContainer} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
// import JSON;


class homeScreen extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      isloading : true,
      data : [],
    }

    function resolveAfter2Seconds() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 5000);
      });
    }
    
    async function asyncCall() {
      console.log('calling');
      const result = await resolveAfter2Seconds();
      console.log(result);
      // expected output: 'resolved'
    }
    
  }
  componentDidMount(){
    return fetch('http://eventregistry.org/api/v1/article/getArticlesForTopicPage?uri=&dataType=news&resultType=articles&articlesCount=10&articlesSortBy=date&articleBodyLen=-1&apiKey=')
      .then((response) => response.json())
      .then(async(responseJson) => {
        //console.log(responseJson)
        this.setState({
          isloading : false,
          data: responseJson.articles.results,
        }, function(){
            console.log("API SUCESS")
            
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  
  render() {
    console.log("hello from home screen")
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={{backgroundColor:"grey"}}>
       {/* <View>
           <Text style={styles.headingText}>
              News App
           </Text>
       </View> */}
       <View  style={styles.visibleArea}>
         <ScrollView 
          horizontal={true}
          contentContainerStyle={{ width: `300%` }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          >
            <View style={styles.items}>
              <Image style={styles.itemsImage} source={{uri: 'https://images.pexels.com/photos/1324544/pexels-photo-1324544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}}/>
            </View>
            <View style={styles.items}>
            <Image style={styles.itemsImage} source={{uri: 'https://images.pexels.com/photos/1324544/pexels-photo-1324544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}}/>
            </View>
            <View style={styles.items}>
            <Image  style={styles.itemsImage} source={{uri: 'https://images.pexels.com/photos/1324544/pexels-photo-1324544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}}/>
            </View>
         </ScrollView>
       </View>
       <Text style={styles.headingBanner}>
        Headings
       </Text>
       
       {
          this.state.data.map((u, i) => {
            return (
              <ImageBackground key={i} source={{uri : u.image}} style={styles.headlines}>
                <TouchableOpacity onPress={() => navigate('Back',{content: JSON.stringify(u.body) ,title: u.title,image : u.image})}>
                    <Text style={styles.headlinesText}>
                      {u.title}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.publisher}>
                    {u.source.title}
                  </Text>
              </ImageBackground>
            );
          })
          }
       </ScrollView>
       
    )
  }
}
const stack =  createStackNavigator();
function DetailStack() {
  return (
    
    <stack.Navigator>
      <stack.Screen name='News App' component={homeScreen}/>
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
    borderRadius: 21,
    overlayColor : 'grey',
    backgroundColor: "#C3C1C1",
  },
  headlinesText: {
    fontSize: 20,
    // marginLeft: 20,
    // marginTop : 10,
    borderRadius: 21,
    height: 137,
    backgroundColor: "rgba(219, 252, 252, 0.5)"
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
