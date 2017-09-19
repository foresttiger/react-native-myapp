import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image
} from 'react-native';

import {TextInputLayout} from 'rn-textinputlayout';
import { connect } from 'react-redux'; // 引入connect函数
import *as loginAction from '../actions/loginAction';// 导入action方法
import { NavigationActions } from 'react-navigation';
import MainPage from './MainPage';
import {toastShort} from '../apps/util/ToastUtil.js';

const {width,height}  = Dimensions.get("window");
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})

class LoginPage extends Component {
  constructor(props) {  
      super(props);  
      this.state = {  
          username: '',  
          password: '',
      };  
  } 
  static navigationOptions = {
    title: '登录',
  };
  componentDidMount() {
        setTimeout(() => this.setState({
            visible: false
        }), 1000); // hide toast after 5s
    };
  componentWillReceiveProps(nextProps, nextState) {
    // console.log(this.props.visible)
    // 登录完成,切成功登录
    if (nextProps.status === '登陆成功' && nextProps.isSuccess) { 
      this.props.callback(true);
      this.props.navigation.goBack();
      return false;
    }else{
      if (nextProps.message) {
        toastShort(nextProps.message);
      }
      console.log(nextProps);
      return true;
    }
    // console.log(this.props.visible)
    return true;
  }

  loginIn(){
    console.log(this.state.username);
    console.log(this.state.password);
    const { login } = this.props;
    let obj = {
      name:this.state.username,
      pwd:this.state.password
    }
    login(obj)
  }
  render() {
     const { login } = this.props;
    return(
      <View style={styles.container}>
        <Image source={{uri: 'http://oss-hz.qianmi.com/qianmicom/u/cms/qmwww/201511/03102524l6ur.png'}} style={styles.logo}/>
        <View>
          <TextInput 
            ref={(username)=> this.username = username} 
            onFocus={() => this.username.focus()} 
            style={styles.input} 
            underlineColorAndroid={'transparent'} 
            placeholder={"手机号"} 
            onChangeText={(username) => this.setState({username})} 
            value={this.state.username} 
          />
        </View>
        <View>
          <TextInput secureTextEntry={true} ref={(password)=> this.password = password} onFocus={() => this.password.focus()} style={styles.input} underlineColorAndroid={'transparent'} placeholder={"密码"} onChangeText={(password) => this.setState({password})} value={this.state.password} />
        </View>
        <TouchableOpacity onPress={()=> { 
            // dispatch(performLoginAction(this.state.username, this.state.psw)); 
              }}
              onPress={this.loginIn.bind(this)} style={{marginTop: 20}}
        >
          <View style={styles.loginBtn}>
            <Text>登录</Text>
          </View>
        </TouchableOpacity>
        <Text style={{marginTop: 20}}>状态: {this.props.status}</Text>
        <View style={{height: 100, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{height: 30, fontSize: 20, margin: 10}}>{login.data}</Text>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#F5FCFF'
    },
    loginBtn: {
        width: width * 0.98,
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth: 1,
        padding: 5,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightblue',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 30,
    },
    input: {
        fontSize: 12,
        width: width * 0.98,
        marginTop: 10,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightblue',
        paddingLeft: 5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFF'
    },
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3333FF',
        height: 40,
        borderRadius: 5,
        marginTop: 10
    }
});

export default connect(
  (state) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
    message:state.loginIn.message,
    visible:state.loginIn.visible

  }),
  (dispatch) => ({
    login: (obj) => dispatch(loginAction.login(obj)),
    loginOut: () => dispatch(loginAction.loginOut())
  })
)(LoginPage)
