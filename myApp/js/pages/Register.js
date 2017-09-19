import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import t from 'tcomb-form-native';
import Counter from '../components/Counter';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import *as counterAction from '../actions/counterAction';
import *as loginAction from '../actions/loginAction';// 导入action方法

const Form = t.form.Form;
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
})

let options = {};
let Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});
class Register extends Component {
  constructor(props){
      super(props)
      this.state={
		value: {
        	name: 'Giulio',
        	surname: 'Canti'
      	}
      }     
  }

  static navigationOptions = {
    title: '表单',
  };
  
  logout() {
    const { loginOut } = this.props;
    loginOut();
    this.props.navigation.dispatch(resetAction)
  }
  Form() {
    const {navigate} = this.props.navigation;
    navigate("Form");
  }
  onChange(value) {
    this.setState({value});
  }
  onPress() {
    let value = this.refs.form.getValue();
    if (value) { 
      console.log(value);
    }
  }
  render() {
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn,loginOut } = this.props;
    return(
      <View style={styles.container}>
      	<View style={{flex:1}}>
      	<Form
          ref="form"
          type={Person}
          value={this.state.value}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        </View>
        <Counter incrementFn={incrementFn} decrementFn={decrementFn} counter={count}>
        </Counter>

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
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
)(Register)
