// pages/myPublish/myPublish.js

var constants = require('../../utils/constants.js')
var pageIndex = 0
var pageSize = 20

var requestMyNewsList = function (that) {
  if (pageIndex == 0) {
    that.infoViewModal.showLoadingView()
  }
  var token = getApp().globalData.userToken
  wx.request({
    url: constants.myNews,
    data: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      token: token
    },
    header: {
      'content-type': 'application/json;charset=utf-8'
    },
    success: function (res) {
      getApp().print(res)
      if (res.statusCode == 200 && res.data.code == 0) {
        var list = res.data.data;
        that.refreshNewsData(list)
      } else {
        if (pageIndex == 0) {
          that.infoViewModal.showErrorView()
        }
      }
    },
    fail: function (res) {
      if (pageIndex == 0) {
        that.infoViewModal.showErrorView()
      }
    }
  })
}

Page({

  data: {
    list: []
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.infoViewModal = this.selectComponent("#infoViewModal");
    requestMyNewsList(this)
  },

  onPullDownRefresh: function () {
  
  },
 
  onReachBottom: function () {
    pageIndex++;
    requestMyNewsList(this)
  },

  onShareAppMessage: function () {
  
  },

  networkRetry: function () {
    requestMyNewsList(this)
  },

  refreshNewsData: function (data) {
    var newList = []
    if (pageIndex == 0) {
      newList = data
    } else {
      newList = this.data.list.concat(data)
    }
    this.setData({
      list: newList,
    })

    var empty = this.data.list.length <= 0;
    if (empty) {
      this.infoViewModal.showEmptyView('暂无数据')
    } else {
      this.infoViewModal.hideInfoView()
    }
  },
})