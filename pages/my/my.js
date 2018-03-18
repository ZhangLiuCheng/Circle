// pages/my/my.js

var utils = require('../../utils/util.js')
var constants = require('../../utils/constants.js')

var defaultAvatar = '/images/avatar_default.png'

var requestUserInfo = function (that) {
  var token = getApp().globalData.userToken
  wx.request({
    url: constants.userInfo,
    data: {
      token: token,
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // getApp().print(res)
      if (res.statusCode == 200 && res.data.code == 0) {
        var data = res.data.data
        // var nickName = data.nickname != undefined ? data.nickname : ''
        // var headUrl = data.headUrl
        that.setData({ 
          nickName: data.nickname,
          avatarPath: data.headUrl
        })
      } else {
      }
    },
    fail: function (res) {
    }
  })
}

Component({

  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }
  },

  data: {
    avatarPath: defaultAvatar,
    nickName: ''
  },

  ready: function () {
    requestUserInfo(this)
  }, 

  methods: {
    showModal: function () {
      this.setData({
        modalHidden: false
      })
    },

    hiddenModal: function () {
      this.setData({
        modalHidden: true
      })
    },

    refreshUserInfo: function () {
      requestUserInfo(this)
    },

    headError: function () {
      this.setData({
        avatarPath: defaultAvatar
      })
    },

    // 修改账户信息
    userInfo: function () {
      var nickName = this.data.nickName
      var headUrl = this.data.avatarPath
      wx.navigateTo({
        url: '../userInfo/userInfo?nickName=' + nickName + '&headUrl=' + headUrl,
      })
    },

    // 我的发布
    myPublish: function () {
      wx.navigateTo({
        url: '../myPublish/myPublish',
      })
    },

    // 我的喜欢
    myLike: function () {
      wx.navigateTo({
        url: '../myLike/myLike',
      })
    },

    // 关于我们
    aboutUs: function () {
      wx.navigateTo({
        url: '../aboutUs/aboutUs',
      })
    },

    // 投诉建议
    advise: function () {
      wx.navigateTo({
        url: '../advise/advise',
      })
    }
  }
})
