import React, { Component } from 'react';
import {AppRegistry} from 'react-native'
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';

import App from './container/App';

const store = configureStore();

export default class myApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}
AppRegistry.registerComponent('myApp', () => myApp);
