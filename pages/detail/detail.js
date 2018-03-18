// pages/detail/detail.js

var constants = require('../../utils/constants.js')

Page({

  data: {
    id: '',
    newsDetail: {}
  },

  onLoad: function (options) {
    this.data.id = options.id
  },

  onReady: function () {
    this.infoViewModal = this.selectComponent("#infoViewModal");
    this.requestDetail()
  },


  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  },

  networkRetry: function () {
    this.requestDetail()
  },

  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.newsDetail.images
    })
  },

  requestDetail: function () {
    let that = this
    that.infoViewModal.showLoadingView()
    var id = that.data.id
    wx.request({
      url: constants.newsDetail,
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        getApp().print(res)
        if (res.statusCode == 200 && res.data.code == 0) {
          var data = res.data.data;
          that.infoViewModal.hideInfoView()
          that.setData({
            newsDetail: data
          })
        } else {
          that.infoViewModal.showErrorView()
        }
      },
      fail: function (res) {
        that.infoViewModal.showErrorView()
      }
    })
  },

  // 点赞
  like: function (res) {

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.data.refreshMainList = true

    let item = this.data.newsDetail
    var collectType = item.isCollect + 1;
    this.requestCollect(item.id, collectType)
    
    if (item.isCollect == 0) {
      item.isCollect = 1
      item.supportCount++
    } else {
      item.isCollect = 0
      item.supportCount--
    }
    this.setData({
      newsDetail: item
    })
  },

  requestCollect: function (newsId, collectType) {
    var that = this
    var app = getApp()
    var userToken = getApp().globalData.userToken
    wx.request({
      url: constants.newsCollection,
      method: "POST",
      data: {
        token: userToken,
        newsId: newsId,
        collectType: collectType,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success: function (res) {
        getApp().print(res)
        if (res.statusCode == 200 && res.data.code == 0) {
          var list = res.data.data;
        } else {
        }
      },
      fail: function (res) {
      }
    })
  }
})