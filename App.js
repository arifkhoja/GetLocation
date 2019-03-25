/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/Details';
import HistoryScreen from './components/HistoryScreen';

// registerScreens(); // this is where you register all of your app's screens

const RootStack = createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      Details: {
        screen: DetailsScreen,
      },
      History: {
        screen: HistoryScreen,
      }
    },
    {
      initialRouteName: 'Home',
    }
  );

  const AppContainer = createAppContainer(RootStack);

  export default class App extends React.Component {
    render() {
      return <AppContainer />;
    }
  }