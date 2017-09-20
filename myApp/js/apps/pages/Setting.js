/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView
} from 'react-native'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import UserProfile from './UserProfile'
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import *as counterAction from '../../actions/counterAction';
import *as loginAction from '../../actions/loginAction';// 导入action方法
//FontAwesome
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'My'})
  ]
})
class Setting extends Component {
  constructor(props){
      super(props)
  }
  back(){
   this.props.navigation.goBack();
  }
  goProfile(){
    this.props.navigator.push({
        component: UserProfile,
        args: {}
    });
  }
  logout() {
    const { loginOut } = this.props;
    loginOut();
    this.props.navigation.dispatch(resetAction)
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="设置"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
         {/* <Item name="账户安全" first={true} onPress={this.goProfile.bind(this)}/>*/}
          <Item name="通用"/>
          {/*<Item name="关于饿了么" first={true}/>*/}
          <Item.Button name="退出登录" onPress={this.logout.bind(this)} first={true}/>
        </ScrollView>
      </View>
    )
  }
}
export default connect(
  (state) => ({
    count: state.counter.count,
  }),
  (dispatch) => ({
    loginOut: () => dispatch(loginAction.loginOut()),
  })
)(Setting)
