import React, { Component } from 'react';
import {AppRegistry,Platform} from 'react-native'
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import Orientation from 'react-native-orientation';

import App from './container/App';

const store = configureStore();
const isIOS = Platform.OS == "ios"

global.__APP__ = false;
global.__ANDROID__ = !isIOS;
global.__IOS__ = isIOS;  
global.__PAD__ = true;  
export default class myApp extends Component {
	componentWillMount() {
		/*锁定只允许横屏*/
	    // Orientation.lockToLandscape();
	    /*锁定只允许竖屏*/
	    // Orientation.lockToPortrait();
      if (__PAD__) {
         Orientation.lockToLandscape();
      }
      if(__APP__){
         Orientation.lockToLandscape();
      }
      console.log(__ANDROID__)
      console.log(__IOS__)
	}
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}
AppRegistry.registerComponent('myApp', () => myApp);
