import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Alert,
  Platform,
  StatusBar
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import Orientation from 'react-native-orientation';
import {TextInputLayout} from 'rn-textinputlayout';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';

import px2dp from '../util'
import LocalImg from '../images'
import *as loginAction from '../../actions/loginAction';// 导入action方法
import MainPage from './MainPage';
import {toastShort} from '../util/ToastUtil.js';


const isIOS = Platform.OS == "ios"
const {width,height}  = Dimensions.get("window");
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^1[34578]\d{9}$/;
const USRNAME_REGEX = /^[A-Za-z0-9]{4,40}$/;
const PWD_REGEX=/^[A-Za-z0-9]{6,20}$/;
let isLANDSCAPE=false;
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})
//PORTRAIT 竖屏  LANDSCAPE：横屏
class LoginPage extends Component {
  constructor(props) {  
      super(props);  
      this.state = {  
          username: '',  
          password: '',
          initial:'PORTRAIT',
          loginBack:'loginBack',
      };  
  } 
  static navigationOptions = {
    title: '登录',
  };
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
      this.setState({
        initial:"PORTRAIT",
        loginBack:"loginBack"
      })
      isLANDSCAPE = false
    } else {
      isLANDSCAPE = true
      this.setState({
        initial:"LANDSCAPE",
        loginBack:"loginBackPad"
      })
    }
  }


  componentWillReceiveProps(nextProps, nextState) {
    console.log(nextProps)
    // console.log(this.props.visible)
    // 登录完成,切成功登录
    if (nextProps.status === '登陆成功' && nextProps.isSuccess) { 
      console.log(this.props)
      this.props.callback(true);
      this.props.navigation.goBack();
      return false;
    }else{
      if (nextProps.message) {
        toastShort(nextProps.message);
      }
      return true;
    }
    // console.log(this.props.visible)
    return true;
  }

  loginIn() {
      let userName = this.state.username;
      let password = this.state.password;
      if (userName === '') {
          toastShort('用户名不能为空...');
          return;
      }else if (!USRNAME_REGEX.test(userName)){
          toastShort('请输入可用的用户名...');
          return;
      }
      if (password === '') {
          toastShort('密码不能为空...');
          return;
      }
      // else if (!PWD_REGEX.test(password)) {}{
      //     toastShort('密码错误...');
      //     return;
      // }
      const { login } = this.props;
      let obj = {
          name: this.state.username,
          pwd: this.state.password
      }
      login(obj)
  }
 render() { 
  let _width = isLANDSCAPE?width*0.4:width*0.95;
  let _loginBack = this.state.loginBack;
  const { login } = this.props; 
  return(
    <View style={styles.container}>
        <StatusBar
          // backgroundColor='#000000'
          translucent={true}
          // hidden={true}
          barStyle={'default'}
          animated={true}      
        />
        <Image source={LocalImg['usr']} style={styles.logo}/>
         <Hideo
            borderColor={'#000000'}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={'white'}
            iconSize={px2dp(25)}
            placeholder={"用户名"}
            ref={(username)=> this.username = username}
            onChangeText={(username) => this.setState({username})} 
            style={{height:70,maxHeight: 70,marginTop: 30,width: _width}}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#c0a354'}
            inputStyle={{ height:60,color: '#464949',fontSize:px2dp(14),borderWidth: 1,borderStyle: 'solid',borderColor: '#c0a354',borderLeftWidth: 0 }}
          />
          <Hideo
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            style={{height:isIOS?40:60,maxHeight: isIOS?40:60,width: _width}}
            iconSize={px2dp(25)}
            iconColor={'white'}
            placeholder={"密码"}
            secureTextEntry={true} 
            ref={(password)=> this.password = password}
            onChangeText={(password) => this.setState({password})} 
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#c0a354'}
            inputStyle={{ height:isIOS?40:60,color: '#464949',fontSize:px2dp(14),borderWidth: 1,borderStyle: 'solid',borderColor: '#c0a354',borderLeftWidth: 0}}
          />
        <TouchableOpacity  onPress={this.loginIn.bind(this)} style={{marginTop: 20}} >
            <View style={[styles.loginBtn,{width:_width}]}>
                <Text style={{color:"#ffffff",fontSize: px2dp(16)}}>登  录</Text>
            </View>
        </TouchableOpacity>
        {/*<Text style={{marginTop: 20}}>状态: {this.props.status}</Text>*/}
        <View style={{height: 100, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{height: 30, fontSize: 20, margin: 10}}>{login.data}</Text>
            <Text style={{height: 30, fontSize: 20, margin: 10}}>{isIOS}</Text>
        </View>
        <View style={styles.loginBack}> 
          <Image source={LocalImg[_loginBack]} style={{width: width,height:height}}/>
        </View>
    </View>
) } }

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        // backgroundColor: '#F5FCFF'
    },
    loginBtn: {
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth: 1,
        marginTop: 20,
        padding: 5,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#c0a354',
        borderColor: '#c0a354',
    },
    logo: {
        width: 100,
        height: 100,
    },
    loginBack:{
        position: 'absolute',
        top:0,
        left: 0,
        width: width,
        height: height,
        zIndex: -1,
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
    inputViews:{
      width: width * 0.98,
      paddingBottom: 20,
      alignItems: 'center',
      // backgroundColor: '#ffffff'
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
    },
    textInput: {
        width: width * 0.9,
        fontSize:  px2dp(14),
        height: 40,
        backgroundColor: '#ffffff'
    },
    inputLayout: {
        width: width * 0.9,
        marginTop: 16,
        // marginHorizontal: 36,
        backgroundColor: 'rgba(255,255,255,0.2)'
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
