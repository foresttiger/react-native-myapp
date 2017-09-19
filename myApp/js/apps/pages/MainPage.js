import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
import NavBar from '../component/NavBar'
import Counter from '../../components/Counter';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions } from 'react-navigation';
import *as counterAction from '../../actions/counterAction';
import *as loginAction from '../../actions/loginAction';// 导入action方法
import LocalImg from '../images'
import px2dp from '../util'


let radio = 1
const { width, height } = Dimensions.get('window')
const isIOS = Platform.OS == "ios"
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
})

class MainPage extends Component {

  constructor(props){
      super(props)
      this.state = {
        name: "佘山",
        phone: "1892379837987",
      }
  }
  static navigationOptions = {
    title: 'MainPage',
  };
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
      radio = 0.8
    } else {
      radio = 1
    }
  }
   goAboutUs(){
      const { navigate } = this.props.navigation;
      navigate('AboutUs');
    }
  
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
  _alert(){
    Alert("sdsadsad")
  }
  _cells(){
    let _this = this;
    const options = [{"icon":"user-o","name":"我的客户"},{"icon":"bars","name":"我的订单"},{"icon":"star-o","name":"我的收藏"},{"icon":"info-circle","name":"关于"}]
    return(
        <View>
           {options.map((item,i)=>{
              let render = (
                <View style={[styles.cellItem,{height: px2dp(60)*radio,paddingHorizontal: px2dp(30)*radio,}]}>
                  <FontAwesomeIcon name={item.icon} size={px2dp(20)*radio} color="rgba(0,0,0,0.4)" />
                  <Text style={[styles.cellName,{marginHorizontal: px2dp(13)*radio}]}>{item.name}</Text>
                  <FontAwesomeIcon name={"angle-right"} style={{position: 'absolute',right: px2dp(20)}} size={px2dp(20)*radio} color="rgba(0,0,0,0.4)" />
                </View>
              )
              return (
                isIOS?(
                  <TouchableOpacity key={i} onPress={() => {_this.goAboutUs()}}>{render}</TouchableOpacity>
                ):(
                  <TouchableOpacity style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableOpacity>
                )
              )
            })
         }
        </View>
      )
  }
  render() {
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn,loginOut } = this.props;
    return(
      <View style={styles.container}>
        <NavBar
          title="我的"
        />
        <TouchableOpacity onPress={this.Form.bind(this)}>
          <View style={[styles.user,{height:px2dp(90)*radio}]}>
            <View style={styles.headImg}>
              <Image
                style={{width: px2dp(70)*radio,height: px2dp(70)*radio}}
                source={LocalImg['usr']}
              />
              
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.userItem}>{this.state.name}</Text>
              <Text style={styles.userItem}>{this.state.phone}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.cellStyles}>
           {this._cells()}
        </View>
       

{/*        <Counter incrementFn={incrementFn} decrementFn={decrementFn} counter={count}>
        </Counter>
        <TouchableOpacity onPress={this.Form.bind(this)} style={{marginTop: 50}}>
          <View>
            <Text>进入Form
            </Text>
          </View>
        </TouchableOpacity>*/}
        {/*<TouchableOpacity onPress={this.logout.bind(this)} style={{marginTop: 50}}>
          <View>
            <Text>退出登录
            </Text>
          </View>
        </TouchableOpacity>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  user:{
    flexDirection: 'row',
    paddingHorizontal: px2dp(20),
    alignItems:'center',
    backgroundColor: '#c0a354',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c0a354',
  },
  headImg:{
    marginRight: px2dp(10)
  },
  userItem:{
    fontSize: px2dp(14),
    margin:px2dp(3),
    color:'#ffffff',
  },
  cellStyles:{
    // borderTopWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'rgba(0,0,0,0.15)',
  },
  cellItem:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderBottomWidth: 0.5,
    // borderStyle: 'dotted',
    // borderStyle: 'dashed', 
    borderColor: 'rgba(0,0,0,0.1)',
  },
  cellName:{
    color:'rgba(0,0,0,0.7)',
    fontSize: px2dp(13),
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
