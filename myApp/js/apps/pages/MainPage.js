import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Counter from '../../components/Counter';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import *as counterAction from '../../actions/counterAction';
import *as loginAction from '../../actions/loginAction';// 导入action方法

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
})

class MainPage extends Component {

  static navigationOptions = {
    title: 'MainPage',
  };
  
  logout() {
    const { loginOut } = this.props;
    loginOut();
    this.props.callback(false);
    this.props.navigation.goBack();
    // this.props.navigation.dispatch(resetAction)
  }
  Form() {
    const {navigate} = this.props.navigation;
    navigate("FormList");
  }
  render() {
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn,loginOut } = this.props;
    return(
      <View style={styles.container}>
        <Counter incrementFn={incrementFn} decrementFn={decrementFn} counter={count}>
        </Counter>
        <TouchableOpacity onPress={this.Form.bind(this)} style={{marginTop: 50}}>
          <View>
            <Text>进入Form
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.logout.bind(this)} style={{marginTop: 50}}>
          <View>
            <Text>退出登录
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FFFF'
  }
})

export default connect(
  (state) => ({
    count: state.counter.count,
  }),
  (dispatch) => ({
    incrementFn: () => dispatch(counterAction.increment()),
    decrementFn: () => dispatch(counterAction.decrement()),
    loginOut: () => dispatch(loginAction.loginOut()),
  })
)(MainPage)
