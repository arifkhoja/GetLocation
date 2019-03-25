import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import HomeScreen from './components/HomeScreen';
import Details from './components/Details';

export function registerScreens() {
  Navigation.registerComponent('HomeScreen', () => gestureHandlerRootHOC(HomeScreen));
  Navigation.registerComponent('Details', () => gestureHandlerRootHOC(Details));
}