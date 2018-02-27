//app.js

var constants = require('utils/constants.js')
var utils = require('utils/util.js')

App({
  globalData: {
    userToken: null,
    userInfo: null
  },

  onLaunch: function () {
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
            console.log(res)
            if (res.statusCode == 200 && res.data.code == 0) {
                var data = res.data.data
                that.globalData.userToken = data.token
                console.log(that.globalData.userToken)
            } else {
              utils.showToast("登录失败")
            }
          },
          fail: function () {
            utils.showToast("登录失败")
          }
        })
      }
    })

    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo
        console.log("获取用户信息成功")
      },
      fail: function () {
        var that = this;
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo'] == false) {
              console.log("拒绝授权")
              // wx.openSetting({
              //   success: (res) => {
              //     console.log("openSetting: " + res.authSetting['scope.userInfo'])
              //     wx.getUserInfo({
              //       success: res => {
              //         // that.globalData.userInfo = res.userInfo
              //         console.log("获取用户信息成功")
              //       }
              //     })
              //   }
              // })
            }
          }
        })
      }
    })
  }
})