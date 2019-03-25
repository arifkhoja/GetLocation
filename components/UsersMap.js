import React from "react";
import {View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const UsersMap = props =>{
    let userLocationMarker = null;

    if(props.userLocation){
        userLocationMarker = <MapView.Marker coordinate = {props.userLocation} />
    }

    return (
        <View style={styles.mapContainer}>
            <MapView
            showsIndoors={true}
            scrollEnabled={false}
            zoomEnabled={false}
             initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={props.userLocation}
            style={styles.map} >
            {userLocationMarker}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer : {
        width:'100%',
        height: '100%',
    },
    map: {
        height: '100%',
        width: '100%'

    }
})

export default UsersMap;