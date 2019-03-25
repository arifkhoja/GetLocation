/*This is an Example of Timer/Stopwatch in React Native */
import React, { Component } from 'react';

import {View, Text,SectionList, StyleSheet,ActivityIndicator, ListView, } from 'react-native';

export default class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
          }
    }
    
    componentDidMount = () => {
        var workArr = [];
        fetch('https://conductive-amp-215215.firebaseio.com/WalkData.json')
        .then(res => res.json())
        .then(parsedres => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource:  ds.cloneWithRows(parsedres),
              })
        })
        .catch(err => console.log(err));
    }

    ListViewItemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
      }

    render(){ 
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
              </View>
            );
          }
        return (
            <View style={styles.MainContainer}>
  <ListView
 
 dataSource={this.state.dataSource}

 renderSeparator= {this.ListViewItemSeparator}

 renderRow={(rowData) => <Text style={styles.rowViewContainer} >Date: {rowData.Date} {"\n"}Distance: {parseFloat(rowData.Distance).toFixed(2)} Km 
   {"\n"}Avg. Pase: {parseFloat(rowData.Speed).toFixed(2)} /km</Text>}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    MainContainer :{
 
        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex:1,
        margin: 10
         
        },
  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }
})
