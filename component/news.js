import styled from 'styled-components/native'
import React ,{Component} from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions,SectionList,TouchableWithoutFeedback, TouchableOpacity, ImageBackground, RefreshControl, PickerIOSComponent, Image} from 'react-native';
import {PanResponder, Animated } from 'react-native'
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage'
import { SharedElement } from 'react-navigation-shared-element';



export default class News extends React.Component{

    constructor(props)
        {
            super(props);

            this.dataDrag = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
            this.pan = this.dataDrag.map( () => new Animated.ValueXY() );
            this.state = {
              showDraggable   : true,
              display : {
                display : "flex",
              },
              darkMode : "",
              bgColor : "",
              textcolor : "",
            }  
            
        }
        changeScreens(u){
          //console.log(u);
          this.props.navigation.navigate('Back',{content: u});
          this.setState({
            display : {
              display : "none",
            },
          })
          
        }
        componentDidMount(){
          AsyncStorage.getItem("darkMode").then((u) => {
            this.setState({
              darkMode : u,
            })
          }).then((p) => {
            if(this.state.darkMode == "true")
            {
                this.setState({
                  darkMode: "true",
                  bgColor : "#282828",
                  textcolor : "white",
                })
                console.log("cdm light mode from news")
            }
            else{
              this.setState({
                darkMode: "false",
                bgColor : "#C3C1C1",
                textcolor : "black",
              })
              console.log("cdm dark mode from news")
            }

          })
          
          
          
          console.log("mounted news");
          
        }
        getResponder(index){
          return PanResponder.create({
              onMoveShouldSetPanResponder: (evt, gestureState) => true,
              onPanResponderMove: Animated.event([
                null,
                {dx : this.pan[index].x}
              ], {
                useNativeDriver: false,
                listener: (evt,gestureState) => {
                  if(gestureState.dx >100 || gestureState.dx < -100)
                  {

                    AsyncStorage.setItem(
                      this.props.content[index].uri.toString(),
                      JSON.stringify(this.props.content[index]),
                    )
                    AsyncStorage.getItem(
                      index.toString(),
                      (err,result) => {
                        //console.log(result);
                      }
                    )
                    console.log("bookmark");
                    Animated.spring(this.pan[index],{
                      toValue: 0,
                      useNativeDriver: false,
                    },{useNativeDriver: false}).start();
                  }
                },
                useNativeDriver : false
              },),
              onPanResponderRelease : () => {
                Animated.spring(this.pan[index],{
                  toValue: 0
                },{useNativeDriver: false}).start();
              }                
          });
        }
    render(){
        return(


           <View>
            <View  style={styles.visibleArea}>
                <ScrollView 
                horizontal={true}
                contentContainerStyle={{ width: `400%` }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled={true}
                >
                    {
                    this.props.content.map((u, i) => {
                        if(u.image)
                        {
                        return (
                            <TouchableOpacity key={i} style={styles.items} onPress={() => this.changeScreens(u)}>
                              <SharedElement id={u.uri}>
                              <ImageBackground style={styles.itemsImage} source={{uri:u.image }}>
                                  <Text style={[styles.topText]}>{u.title}</Text>
                              </ImageBackground>
                              </SharedElement>
                            </TouchableOpacity>
                        );
                        }
                    })
                }
                </ScrollView>
            </View>
            <Text style={[styles.headingBanner, {backgroundColor: this.state.bgColor, color: this.state.textcolor}]}>
                Headlines
            </Text>
            {
                //console.log(data)
                this.props.content.map((u, i) => {
                    if(u.image && i > 4) 
                    {
                    return (
                        // <Swipeable 
                        //   key={i}
                        //   renderLeftActions={leftActions}
                        // >
                        <Animated.View key={i} style={{transform: [
                          {translateX : this.pan[i].x},
                        ],backgroundColor: this.state.bgColor}}
                        {...this.getResponder(i).panHandlers}
                        >
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Back',{content: u,darkMode: this.state.darkMode})}>
                              <View style={{flex: 1,flexDirection:'row',height: 120,marginTop:8,marginLeft:10}}>
                                  <SharedElement id={u.uri}>
                                    <Image source={{uri : u.image}} style={{flex:3,height: 110,borderRadius:21, width: 150}}  />
                                  </SharedElement>
                                  <Text fontWeight="900" style={[styles.headlinesText, {flex:9,color:this.state.textcolor}]}>
                                        {u.title}
                                  </Text>
                              </View>
                              </TouchableWithoutFeedback>

                        </Animated.View>
                    );
                    }
                })
                }
                                
            </View>
        );
    }
}



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
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
    top: 0,
    width : width,
    height: height -370,
  },
  topText: {
    //flex : 1,
    bottom: 0,
    backgroundColor :"rgba(212,212,180,0.5)", 
    fontSize: 20,
    marginTop : "50%",
    marginBottom : 0,
    paddingLeft : 20,
    fontFamily : "sans-serief",
    fontWeight :"bold",
    textAlignVertical:"bottom",
  },
  items : {
    width : width,
    //borderWidth: 2,
    marginTop: 8,
    //borderRadius: 21,
    height: "100%",
    shadowColor: 'blue',
    shadowOpacity: 0.3,
    elevation: 50,

  },
  
  itemsImage: {
    height: "100%",
    //borderRadius: 21,
  },
  headingBanner: {
    fontSize: 25,
    paddingLeft: 30,
    //color: 'black', //night mode
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
    //borderRadius : 21,
    //overlayColor : '#282828',
  },
  headlinesText: {
    fontSize: 18,
    marginLeft: 20,
    marginTop : 10,
    borderRadius: 21,
    //fontFamily : "sans-serief",
    fontWeight: "bold",
    //height: 137,
    //backgroundColor: "rgba(0, 0, 15, 0.5)"
  },
})