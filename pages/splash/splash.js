// pages/splash/splash.js

var QQMapWX = require('../../libs/qqmap-wx-jssdk1/qqmap-wx-jssdk.min.js');
var qqmapsdk;

var constants = require('../../utils/constants.js')
var utils = require('../../utils/util.js')

Page({

  data: {
  },

  onLoad: function (options) {
    this.userLogin()
    qqmapsdk = new QQMapWX({
      key: 'QTVBZ-N3WWU-RSRVL-BAXSY-JRBC3-ZPFN7'
    });
    this.setLocation();

    // setTimeout(function () {
    //   wx.redirectTo({
    //     url: '../main/main',
    //   })
    // }.bind(this), 2000)
  },

  onReady: function () {
  },

  onShareAppMessage: function () {
  
  },

  userLogin: function () {
    var that = this
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: constants.loginUrl + '?code=' + code,
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.statusCode == 200 && res.data.code == 0) {
              that.userLoginSuccess(res)
            } else {
              that.userLoginFailed()
            }
          },
          fail: function () {
            that.userLoginFailed()
          }
        })
      }
    })
  },

  userLoginSuccess: function (res) {
    var app = getApp()
    var data = res.data.data
    app.globalData.userToken = data.token
    setTimeout(function () {
      wx.redirectTo({
        url: '../main/main',
      })
    }.bind(this), 2000)
  },

  userLoginFailed: function () {
    utils.showToast("登录失败,重试中...")
    var that = this
    setTimeout(function () {
      that.userLogin()
    }.bind(this), 1000)
  },

  // 设置地址
  setLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.reverseGeocoder(res.latitude, res.longitude)
      },
      fail: function (res) {
      }
    })
  },

  // 经纬度转地址
  reverseGeocoder: function (latitude, longitude) {
    var app = getApp()
    qqmapsdk.reverseGeocoder({
      // coord_type: 4,
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        var location = {};
        location.addressName = res.result.address
        location.latitude = res.result.location.lat
        location.longitude = res.result.location.lng
        app.globalData.location = location
      }
    });
  },
})