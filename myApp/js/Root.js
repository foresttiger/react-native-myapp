import React, { Component } from 'react';
import {AppRegistry} from 'react-native'
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import Orientation from 'react-native-orientation';

import App from './container/App';

const store = configureStore();

export default class myApp extends Component {
	componentWillMount() {
		/*锁定只允许横屏*/
	    // Orientation.lockToLandscape();
	    /*锁定只允许竖屏*/
	    Orientation.lockToPortrait();
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
