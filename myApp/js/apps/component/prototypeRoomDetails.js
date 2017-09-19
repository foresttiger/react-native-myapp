/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  BackAndroid,
  ScrollView,
  StyleSheet,
  Alert,
  AlertIOS,
  RefreshControl,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  // Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
  StatusBar,
  InteractionManager
} from 'react-native'
import LocalImg from '../images'
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper2'
import Carousel from 'react-native-carousel'
import Image from 'react-native-image-progress'
import * as Progress from 'react-native-progress'
import {CustomCachedImage} from "react-native-img-cache"
// import * as CacheManager from 'react-native-http-cache';

 
import DataEncrypt from './DataEncrypt'
import VRDetails from './VRDetails';
const { width, height } = Dimensions.get('window');
const panoramaUrlBtn = "";
const isAndroid =  Platform.OS != "ios";
//FontAwesome
export default class prototypeRoomDetails extends Component {
  constructor(props){
      super(props)
      // console.log(props)
        this.state = {
          datas: [],
          panoramaUrl:"",
          designId:props.navigation.state.params.designId,
          isVisible:true,
          type:"Circle",
          size: 100,
          color: "#c0a354",
          fadeInOpacity: new Animated.Value(0),
          name:"",
        }
  }
  back(){
    this.props.navigation.goBack();
  }
  componentWillMount(){
    // this._loaderDesignDatas(); 
    // this._loaderimages(); 
  }
  componentDidMount() {
     this._loaderDesignDatas(); 
     // this._loaderimages(); 
     Animated.timing(this.state.fadeInOpacity, {
         duration: 1500, // 动画时间
         easing: Easing.linear // 缓动函数
     }).start();
  }    
 goVrDetails(key,obj){
    const {navigate} = this.props.navigation;
    navigate("VRDetails",obj);
    // let pages = {
    //   "VRDetails": VRDetails
    // }
    // if(pages[key]){
    //   this.props.navigator.push({
    //       component: pages[key],
    //       args: {obj}
    //   })
    // }
  }
  _renderHeaderRight(){
    let panoramaUrl = this.state.panoramaUrl
    let obj = {name:this.state.name,panoramaUrl:panoramaUrl}
    if (panoramaUrl!="") {
      return (
        <View style={styles.headeRightStyle}>
            <TouchableOpacity>
              <Icon.Button  name="ios-videocam" backgroundColor="#000000" onPress={()=>{this.goVrDetails("VRDetails",obj)}}>
                VR全景 
              </Icon.Button>
            </TouchableOpacity>
        </View>
          )      
    }

  }
  _renderHeader(){
    return (
        <View style={styles.headerStyle}>
            <View style={{marginLeft: px2dp(8),justifyContent: 'flex-start',flexDirection: 'row',alignItems:'center' }}>
              <TouchableOpacity>
                <Icon.Button name="md-arrow-back" backgroundColor="#c0a354" onPress={this.back.bind(this)}>
                  返回
                </Icon.Button>
               {/* <Icon name="ios-arrow-back" size={px2dp(26)} color="#000000"/>*/}
              </TouchableOpacity>
              <Animated.Text style={styles.productNameStyle} numberOfLines={1}>{this.state.name}</Animated.Text>
            </View>
            {this._renderHeaderRight()}
        </View>
      )
  }
  _loaderDesignDatas(){
        var _this = this;
        var selectObj = {
                serviceName: "getDesignSystemDesignMeta",
                designId: _this.props.navigation.state.params.designId,
            };
        // console.log(selectObj)
        var formData = "";
        for (let k in selectObj) {
            formData +=k +'='+ selectObj[k] +'&'
        } 
        formData = formData.substr(0, formData.length - 1);
        fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
                method: 'POST',
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                body: formData
            }).then((response) => response.text())
              .then((responseData) => { // 上面的转好的json
                // console.log(DataEncrypt(responseData))
                var responseDatas = DataEncrypt(responseData).entity
                panoramaUrlBtn = responseDatas.panoramaUrl
                _this._loaderimages(); 
                // _this.setState(_obj)
              })
              .catch((error)=> {
                  // console.log(error);
                  AlertIOS.alert('提示','网络异常',[
                      {
                          text: '重试',
                          onPress:function(){
                             _this._loaderDesignDatas();
                          }
                      }
                  ]);
              }); 

  }
    _loaderimages() {
        var _this = this;
        var selectObj = {
            serviceName: "getProductDesignRenderImageData",
            designId: _this.props.navigation.state.params.designId,
            "renderType": "image"
        };
        // console.log(selectObj)
        var formData = "";
        for (let k in selectObj) {
            formData += k + '=' + selectObj[k] + '&'
        }
        formData = formData.substr(0, formData.length - 1);
        fetch('http://yun.kic.com.cn/control/mobileCommonServiceEncryptData', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData
            }).then((response) => response.text())
            .then((responseData) => { // 上面的转好的json
                // console.log(DataEncrypt(responseData))
                var responseDatas = DataEncrypt(responseData).list
                let _obj = {
                    datas: responseDatas,
                    panoramaUrl:panoramaUrlBtn,
                    name:responseDatas[0].productName
                }
                _this.setState(_obj)
            })
            .catch((error) => {
                // console.log(error)
                  AlertIOS.alert('提示','网络异常',[
                      {
                          text: '重试',
                          onPress:function(){
                             _this._loaderimages();
                          }
                      }
                  ]);
                // _this.forceUpdate();
            });

    }
  _renderItems(){
    let obj = this.state.datas;
    let strings = [];
   return obj.map((item, i) => {
      // console.log(item)
      let img_host = "http://floorplan-designer-bucket.oss-cn-hangzhou.aliyuncs.com/filesystem/render/"
      let url = img_host + item.jobId + "/output.jpg";
      let _render = (i) => {
        return( <View style={styles.imgsShowStyle}>
      {/*<Image indicator={Progress.Circle}  source={LocalImg['banner'+(2)]} style={{width: width, height: height,resizeMode:'contain'}}/>*/}

          <CustomCachedImage
            component={Image}
            source={{uri:"http://pic8.nn-home.com/filesystem/render/"+ item.jobId + "/output.jpg"}} 
            // indicator={Progress} 
            defaultSource={LocalImg['back']}
            style={{width: width, height: height-px2dp(18)}}
            />
          {/*<Image defaultSource={LocalImg['back']} style={{width: width, height: height-px2dp(18)}} source={{uri:"http://pic8.nn-home.com/filesystem/render/"+ item.jobId + "/output.jpg"}} />*/}
          <View style={styles.textViewStyle}>
            <Animated.Text numberOfLines={i}  style={[styles.textStyle,{opacity: this.state.fadeInOpacity}]}>........</Animated.Text>
          </View>
         </View>
         )
      }
      return (
        <View  key={i}>{_render(i)}
        </View>
      )
      // strings.push(<View key={i}>{_render(i)}</View>)
    })
    // return strings

  }
  _renderData(){
    const w = width/4, h = w*.6 + 20
    let obj = this.state.datas;
    if (obj.length != 0) {
      return (
        <Swiper
          style={{position: 'relative' }}
          index = {0}
          height={height}
          autoplay={false} 
          autoplayTimeout={2}
          showsButtons={false}
          horizontal={false}
          paginationStyle={{ right: 10 }}
          showsPagination={true}
          dotStyle={{backgroundColor:'#ffffff', width: 12, height: 12,borderRadius: 12}}
          activeDotStyle={{backgroundColor:'#c0a354', width: 12, height: 12,borderRadius: 12}}>
          {this._renderItems()}
        </Swiper>
      )
    }
  }
  _render(){
    return (
      <View style={styles.content}>
        {this._renderHeader()}
        <View  indicator={Progress.Circle}> 
          {this._renderData()}
        </View>
       {/*this._renderItems()*/}
      </View>
    )
  }
  render(){
    return (
        <View style={styles.container}  indicator={Progress.Pie}>
          {this._render()}
        </View>
      )
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#c0a354',
      paddingTop: isAndroid?0:px2dp(18)
    },
    content:{
        backgroundColor: "#ebebeb",
    },
    headerStyle:{
      width: width,
      position: 'absolute',
      top: 0,
      left: 0,
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: px2dp(5),
      backgroundColor: 'rgba(0,0,0,0.01)',
      zIndex: 99,
    },
    headeRightStyle:{
      marginLeft:px2dp(200),
      marginRight: px2dp(8)
    },
    textViewStyle:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: width,
        paddingTop: px2dp(5),
        paddingBottom: px2dp(5),
    },
    textStyle: {
        paddingLeft: px2dp(5),
        fontSize: px2dp(12),
        color: "#ffffff"
    },
    productNameStyle:{
      fontSize: px2dp(16),
      color: '#ffffff',
      marginLeft: px2dp(20),
    },
    imgsShowStyle:{
      width: width, 
      height:height-px2dp(16),
      backgroundColor: '#000000'
    }


})
