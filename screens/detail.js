import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions , ScrollView} from 'react-native';
 
export default class detailView extends Component {
  constructor(props){
    super(props)
    this.state = {
      content : props.route.params.content,
      title : props.route.params.title,
      urlToImage : props.route.params.image,
    }
  }
  render() {
    //const { navigate } = this.props.navigation
    return (
      <ScrollView style={{backgroundColor:'#282828'}}>
          <Image style={styles.banner} source={{uri: this.state.urlToImage}}/>
          <Text style={styles.heading}>
            {this.state.title}

         </Text>
          <Text style={styles.content}>
            {this.state.content}
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
    marginTop : 22,
    color: "#C9BFF2",
    fontFamily: "sans-serief",
  },
  content: {
    margin : 10,
    marginTop : 22,
    marginLeft: 20,
    fontSize: 19,
    textAlign: 'left',
    color: 'white',
    fontFamily: 'Numans-Regular',
  }
})