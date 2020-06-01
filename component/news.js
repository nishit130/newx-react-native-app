import styled from 'styled-components/native'
import React ,{Component} from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions,SectionList, TouchableOpacity, ImageBackground, RefreshControl, PickerIOSComponent} from 'react-native';
import {PanResponder, Animated } from 'react-native'
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage'


export default class News extends React.Component{

    constructor(props)
        {
            super(props);

            this.dataDrag = [0,1,2,3,4,5,6,7,8,9,10,11,12];
            this.pan = this.dataDrag.map( () => new Animated.ValueXY() );
            this.state = {
              showDraggable   : true, 
               
            }  
            
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
                      index.toString(),
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
        console.log("hello")
        //const { navigate } = this.props.navigation
        // const navigation = useNavigation();
        var swipeOutButtons = [
          {
            text : "buttons",
          }
        ]
        return(


           <View>
            <View  style={styles.visibleArea}>
                <ScrollView 
                horizontal={true}
                contentContainerStyle={{ width: `400%` }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                >
                    {
                        // navigation.navigate('Back',{content: u.body ,title: u.title,image : u.image})
                    this.props.content.map((u, i) => {
                        if(u.image)
                        {
                        return (
                            <View key={i} style={styles.items}>
                            <ImageBackground style={styles.itemsImage} imageStyle={{borderRadius:21}} source={{uri:u.image }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Back',{content: u.body ,title: u.title,image : u.image})}>
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
                        ]}}
                        {...this.getResponder(i).panHandlers}
                        >

                                <ImageBackground imageStyle={{ borderRadius: 21,opacity:0.4}}
                                source={{uri : u.image}} style={styles.headlines}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Back',{content: u.body ,title: u.title,image : u.image})}>
                                        <Text style={styles.headlinesText}>
                                        {u.title}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.publisher}>
                                        {u.source.title}
                                    </Text>
                                </ImageBackground>
                        </Animated.View>
                    );
                    }
                })
                }
                                      {/* <Animated.View style={{transform: [
                                          {translateX : this.state.pan.x},
                                        ]}}
                                        {...this._panResponder.panHandlers}
                                        >  
                                    <View style={{margin:100,backgroundColor:"pink"}}>
                                        <Text>dragable</Text>
                                    </View> 
                                </Animated.View>  */}
                                
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