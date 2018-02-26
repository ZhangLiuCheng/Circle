//app.js

var constants = require('utils/constants.js')

App({
  globalData: {
    userInfo: null
  },

  onLaunch: function () {
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
            var openid = res.data.openid
            console.log(res.data)

            // wx.showToast({
            //   title: '获取opengId成功',
            //   icon: 'none',
            //   duration: 1500
            // })
          },
          fail: function () {
            console.log("获取opengId失败")

            // wx.showToast({
            //   title: '获取opengId失败',
            //   icon: 'none',
            //   duration: 1500
            // })
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