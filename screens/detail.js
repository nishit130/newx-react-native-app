import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions , ScrollView} from 'react-native';
 
export default class detailView extends Component {
  constructor(props){
    super(props)
    this.state = {
      name : props.route.params.name,
    }
  }
  render() {
    //const { navigate } = this.props.navigation
    return (
      <ScrollView>
          <Image style={styles.banner} source={{uri: 'https://images.pexels.com/photos/1324544/pexels-photo-1324544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}}/>
          <Text style={styles.heading}>
            India's Covid 19 fatality rate has reduced from 3.3% to 2.87% today; lowest in the world: Health Ministry
          </Text>
          <Text style={styles.content}>
          New Delhi: The government on Tuesday (May 26) said that a total of 60,490 patients have so far recovered from coronavirus across the nation and cited improvement in recovery rate in comparison to the global data of fatality.

Addressing media persons, Lav Agarwal, Joint Secretary in Union Ministry of Health and Family Welfare, said, "India's recovery rate is steadily improving from 7.1% in March to 41.6% today. Our COVID-19 fatality rate is among the lowest in the world: It has reduced from 3.3% to 2.87% today." 

"The global average for case fatality is presently around 6.4%. For India, the figure is as low as 2.87%, one of the lowest among countries which have reported high number of COVID-19 cases," said Lav Agarwal, adding "4.4 deaths per lakh population have been reported for the world, while India has reported about 0.3 deaths per lakh population, which is amongst the lowest in the world. This has been due to lockdown, timely identification, and management of coronavirus cases." 
          </Text>
       </ScrollView>
    )
  }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles =  StyleSheet.create({
  banner : {
    margin: 10,
    width : width - 20,
    height : 221,
    borderRadius : 21,
  },
  heading: {
    fontSize: 20,
    marginLeft: 20,
    marginTop : 10,
    color: "#3F1DC6",
  },
  content: {
    margin : 10,
    marginLeft: 20,
    fontSize: 19,
    fontFamily: "Numans",
  }
})