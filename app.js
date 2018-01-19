//app.js
App({
  globalData: {
    userInfo: null
  },

  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log("login:" + res.code);
        var code = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1d8abcecdf5c0f0a&secret=f3aa52ec09d9b50bda9b52d405bb282a&js_code=' + code + '&grant_type=' + code,
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var openid = res.data.openid
            console.log("opengid: " + openid)
          },
          fail: function () {
            console.log("获取opengId失败")
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
              wx.openSetting({
                success: (res) => {
                  console.log("openSetting: " + res.authSetting['scope.userInfo'])
                  wx.getUserInfo({
                    success: res => {
                      // that.globalData.userInfo = res.userInfo
                      console.log("获取用户信息成功")
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }
})