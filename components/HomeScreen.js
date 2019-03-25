import React, {Component} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity,Button } from 'react-native';

import UsersMap from "./UsersMap";

class HomeScreen extends React.Component {
    state = {
      userLocation: null
    };
    getUserLocationHandeler = () =>{
      navigator.geolocation.getCurrentPosition(position => {
          this.setState({
              userLocation : {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }
          });
        });
      }
      componentWillMount(){
          navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                userLocation : {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.0022,
                  longitudeDelta: 0.0021,
                }
            });
          });
        }
    render() {
      return (
        <View style={styles.container}>
          <UsersMap userLocation = {this.state.userLocation}>
          </UsersMap>
          <View style={{
                      position: 'absolute',//use absolute position to show button on top of the map
                      top: 80, //for center align
                      zIndex: 9999
                  }}>
                  <TouchableOpacity style={{
                                            borderWidth:1,
                                            borderColor:'rgba(0,0,0,0.2)',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            backgroundColor:'black',
                                            borderRadius:50,
                                            
                    width:80,
                    height:50,
                    justifyContent:"center",
                      }}
                      onPress={() => this.props.navigation.navigate('History')}
                  ><Text style={{
                    color: 'white'
                  }}>History</Text></TouchableOpacity>
          </View>
          <View style={{
                      position: 'absolute',//use absolute position to show button on top of the map
                      top: 580, //for center align
                      zIndex: 9998
                  }}>
                    
                  <TouchableOpacity style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:100,
                        height:100,
                        backgroundColor:'yellow',
                        borderRadius:50,
                      }}
                      onPress={() => this.props.navigation.navigate('Details')}
                  ><Text>Start</Text></TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    bubble: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.7)",
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20
    },
  
  });

  export default HomeScreen;