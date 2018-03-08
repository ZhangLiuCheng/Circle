// pages/search/search.js

var constants = require('../../utils/constants.js')
var pageIndex = 0
var pageSize = 20

var requestSearchList = function (that) {
  if (pageIndex == 0) {
    that.infoViewModal.showLoadingView()
  }
  var token = getApp().globalData.userToken
  var keyword = that.data.keyword
  wx.request({
    url: constants.searchList,
    data: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      token: token,
      keyword: keyword
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
    keyword: '',
    list: []
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.infoViewModal = this.selectComponent("#infoViewModal");
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
    pageIndex++;
    requestSearchList(this)
    console.log("onReachBottom: 上拉加载更多")
  },

  onShareAppMessage: function () {
  
  },

  networkRetry: function () {
    getApp().print("重试")
    requestSearchList(this)
  },

  onSearchCancel: function (e) {
    console.log("onSearchCancel")
    if (this.data.list.length == 0) {
      wx.navigateBack()
    }
  },

  onSearchTo: function (e) {
    console.log("onSearchTo ")
    this.data.keyword = e.detail
    requestSearchList(this)
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