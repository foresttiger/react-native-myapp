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
    NavigationActions.navigate({ routeName: 'MyTab'})
  ]
})

class MyCustomer extends Component {

  constructor(props){
      super(props)
      this.state = {
        name: "佘山",
        phone: "1892379837987",
      }
  }
  static navigationOptions = {
    title: '我的客户',
    headerStyle:{
      backgroundColor: '#c0a354'
    },
    headerBackTitleStyle:{
      color:'#ffffff'
    },
    headerTintColor:'#ffffff'
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
      navigate('FormList');
    }
  logout() {
    const { loginOut } = this.props;
    loginOut();
    // this.props.navigation.goBack();
    this.props.navigation.dispatch(resetAction)
  }
  render() {
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn,loginOut } = this.props;
    return(
      <View style={styles.container}>
	      <TouchableOpacity onPress={this.logout.bind(this)} style={{marginTop: 50}}>
	          <View>
	            <Text>退出登录
	            </Text>
	          </View>
	        </TouchableOpacity>
        <TouchableOpacity onPress={this.goAboutUs.bind(this)} style={{marginTop: 50}}>
           <Text>表单
              </Text>
        </TouchableOpacity>
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
    loginOut: () => dispatch(loginAction.loginOut()),
  })
)(MyCustomer)
