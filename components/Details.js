/*This is an Example of Timer/Stopwatch in React Native */
import React, { Component } from 'react';
//import React in our project
import { StyleSheet,Text,View, TouchableHighlight,   TouchableOpacity,
  Platform, Alert } from 'react-native';
//import all the required components
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
//importing library to use Stopwatch and Timer
import haversine from "haversine";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";

 
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStart: false,
      isStopwatchStart: false,
      timerDuration: 90000,
      resetTimer: false,
      resetStopwatch: false,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
       latitude: LATITUDE,
       longitude: LONGITUDE
      })
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.SaveData = this.SaveData.bind(this);
  }
SaveData(){
  console.log(this.getFormattedTime);
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
  fetch('https://conductive-amp-215215.firebaseio.com/WalkData.json',{
    method:'POST',
    body: JSON.stringify({
      Distance: this.state.distanceTravelled,
      TimeTaken: this.getFormattedTime,
      Speed: this.state.speed == null?0:this.state.speed,
      Date: today
    })
  }).then(res => console.log(res))
  .catch(err => console.log(err))
}

  startStopTimer() {
    this.setState({isTimerStart: !this.state.isTimerStart, resetTimer: false});
  }
  resetTimer() {
    this.setState({isTimerStart: false, resetTimer: true});
  }
  startStopStopWatch() {
    this.setState({isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
        const { latitude, longitude } = position.coords;
        
        const newCoordinate = {
          latitude,
          longitude
        };
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
           }
         } else {
           coordinate.timing(newCoordinate).start();
         }
         this.setState({
           speed:0
         })
         this.setState({
           latitude,
           longitude,
           routeCoordinates: routeCoordinates.concat([newCoordinate]),
           distanceTravelled:
           distanceTravelled + this.calcDistance(newCoordinate),
           prevLatLng: newCoordinate,
           speed: position.coords.speed 
         });
       },
       error => console.log(error),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
   
  }
  resetStopwatch() {
    this.setState({isStopwatchStart: false, resetStopwatch: false});
    if(this.state.distanceTravelled<=0.00){
      Alert.alert(
        'Discard Run',
        'Are you sure you want to discard run?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              this.setState({isStopwatchStart: true, resetStopwatch: false});
            },
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            this.setState({isStopwatchStart: false, resetStopwatch: true, speed:0,distanceTravelled:0});
            navigator.geolocation.clearWatch(this.watchID);
            this.props.navigation.goBack();
          }},
        ],
        {cancelable: false},
      );
    }else{
    this.SaveData()
    this.setState({isStopwatchStart: false, resetStopwatch: true, speed:0,distanceTravelled:0});
    navigator.geolocation.clearWatch(this.watchID);


    }
  }
  getFormattedTime(time) {
      this.currentTime = time;
  }
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    Speed: 0
 }
 watchID= null;


 componentDidMount = () => {
  this.setState({isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
  this.watchID = navigator.geolocation.watchPosition(
    position => {
      const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
      const { latitude, longitude } = position.coords;
      
      const newCoordinate = {
        latitude,
        longitude
      };
      if (Platform.OS === "android") {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            newCoordinate,
            500
          );
         }
       } else {
         coordinate.timing(newCoordinate).start();
       }
       this.setState({
         speed:0
       })
       this.setState({
         latitude,
         longitude,
         routeCoordinates: routeCoordinates.concat([newCoordinate]),
         distanceTravelled:
         distanceTravelled + this.calcDistance(newCoordinate),
         prevLatLng: newCoordinate,
         speed: position.coords.speed 
       });
     },
     error => console.log(error),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  ); this.setState({isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
  this.watchID = navigator.geolocation.watchPosition(
    position => {
      const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
      const { latitude, longitude } = position.coords;
      
      const newCoordinate = {
        latitude,
        longitude
      };
      if (Platform.OS === "android") {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            newCoordinate,
            500
          );
         }
       } else {
         coordinate.timing(newCoordinate).start();
       }
       this.setState({
         speed:0
       })
       this.setState({
         latitude,
         longitude,
         routeCoordinates: routeCoordinates.concat([newCoordinate]),
         distanceTravelled:
         distanceTravelled + this.calcDistance(newCoordinate),
         prevLatLng: newCoordinate,
         speed: position.coords.speed 
       });
     },
     error => console.log(error),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
 }

 calcDistance = newLatLng => {
  const { prevLatLng } = this.state;
  return haversine(prevLatLng, newLatLng) || 0;
};

 componentWillUnmount = () => {
   
 }
  render() {
    return (

      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style = {styles.container}>
              <TouchableOpacity style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:100,
                        height:100,
                        backgroundColor:'yellow',
                        borderRadius:50,
                        fontSize: 40,
                      }}>
                <Text style={styles.bottomBarContent}>Distance {"\n"}
                  {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                </Text>
              </TouchableOpacity>
              <Text style = {styles.boldText}>
                Speed:
              </Text>
              <Text>
                {this.state.speed}
              </Text>
      </View>
        <View style={{flex:1,marginTop:32, alignItems:'center', justifyContent:'center'}}>
          <Stopwatch laps secs 
            start={this.state.isStopwatchStart}
            //To start
            reset={this.state.resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={this.getFormattedTime} />
          <TouchableHighlight onPress={this.startStopStopWatch}>
            <Text style={{fontSize: 20, marginTop:10}}>
              {!this.state.isStopwatchStart ? "START" : "Pause"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetStopwatch}>
            <Text style={{fontSize: 20, marginTop:10}}>Stop</Text>
          </TouchableHighlight>
        
        </View>
      </View>
    );
  }
}
 
const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems:'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  }
};
  
const styles = StyleSheet.create ({
  container: {
     flex: 1,
     alignItems: 'center',
     marginTop: 50
  },
  boldText: {
     fontSize: 30,
     color: 'red',
  }
})