// pages/my/my.js
Component({

  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }
  },

  data: {
    avatarPath:'/images/avatar_default.png'
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

    // 修改账户信息
    userInfo: function () {
      wx.navigateTo({
        url: '../userInfo/userInfo',
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
