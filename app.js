//app.js

App({
  globalData: {
    userToken: null,
    // userInfo: null,
    location: {
      addressName: '',
      latitude: 0,
      longitude: 0
    }
  },

  print: function (res) {
    console.log(res)
  },

  onLaunch: function () {
    /*
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
    */
  }
})