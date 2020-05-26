import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions, Image} from 'react-native';
 


export default class homeScreen extends Component {

  
  render() {

    
    return (
      <ScrollView>
       <View>
           <Text style={styles.headingText}>
              News App
           </Text>
       </View>
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
       <View style={styles.headlines}>
          <Text style={styles.headlinesText}>
            India's Covid 19 fatality rate has reduced from 3.3% to 2.87% today; lowest in the world: Health Ministry
          </Text>
          <Text style={styles.publisher}>
            Times of India
          </Text>
       </View>
       <View style={styles.headlines}>
          <Text style={styles.headlinesText}>
            India's Covid 19 fatality rate has reduced from 3.3% to 2.87% today; lowest in the world: Health Ministry
          </Text>
          <Text style={styles.publisher}>
            Times of India
          </Text>
       </View>
       <View style={styles.headlines}>
          <Text style={styles.headlinesText}>
            India's Covid 19 fatality rate has reduced from 3.3% to 2.87% today; lowest in the world: Health Ministry
          </Text>
          <Text style={styles.publisher}>
            Times of India
          </Text>
       </View>
       <View style={styles.headlines}>
          <Text style={styles.headlinesText}>
            India's Covid 19 fatality rate has reduced from 3.3% to 2.87% today; lowest in the world: Health Ministry
          </Text>
          <Text style={styles.publisher}>
            Times of India
          </Text>
       </View>
       </ScrollView>
       
    )
  }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
  headingText: {
    margin: 10,
    marginLeft: 30,
    fontSize : 27,
  },
  visibleArea : {
    width : width,
    height: 158,
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
    height: 150,
    borderRadius: 21,
  },
  headingBanner: {
    fontSize: 25,
    marginLeft: 30,
    marginTop:0,

  },
  headlines:{
    width : width- 16,
    height: 137,
    //borderWidth: 2,
    marginLeft : 8,
    marginRight: 8,
    marginTop: 13,
    borderRadius: 21,
    backgroundColor: "#C3C1C1",
  },
  headlinesText: {
    fontSize: 20,
    marginLeft: 20,
    marginTop : 10,
  },
  publisher: {
    marginLeft: width - 180,
    fontSize: 16,
    color: "#423F3F",
    marginTop: 10,
  }
})