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
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'
import NavBar from './NavBar'
import MyWebView from './MyWebView'

export default class VRDetails extends Component {
  constructor(props){
      super(props)
      this.state={
      	title:props.navigation.state.params.name,
        jobId:props.navigation.state.params.jobId,
        panoramaUrl:props.navigation.state.params.panoramaUrl
      }
  }
  back(){
  	 this.props.navigation.goBack();
  }
  render(){
    console.log(this.state.panoramaUrl);
    return (
      <View style={{flex: 1, backgroundColor: "#c0a354"}}>
      	<NavBar
          title={this.state.title}
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <MyWebView
          source={{uri: this.state.panoramaUrl}}
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
  },
  backStyle:{
  	width: 80,
  	height: 80,
  	position: 'absolute',
  	top: 100,
  	left: 100,
  	backgroundColor: 'red'
  }
})
