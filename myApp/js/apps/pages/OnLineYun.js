/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import NavBar from '../component/NavBar'
import MyWebView from '../component/MyWebView'

export default class Discover extends Component {
  constructor(props){
      super(props)
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#c0a354",paddingTop: 20}}>
        <NavBar title="云尚筑家"/>
        <MyWebView
          source={{uri: 'http://www.nn-home.com'}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  webview_style: {
    flex: 1
  }
})
