// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabInex : 0,
    homeSrc: "image/home_check.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabIndex:0
    })
  },

  tabIndex:function(e) {
    var idVar = e.currentTarget.id;
    if (idVar == 'home') {
      this.setData({
        tabIndex: 0
      })
      console.log("选择首页")
    } else {
      this.setData({
        tabIndex: 1
      })
      console.log("选择我的")
    }
  },

  publish:function() {
    wx.navigateTo({
      url: '../publish/publish',
    })
  }
})