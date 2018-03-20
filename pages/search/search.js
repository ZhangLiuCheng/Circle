// pages/search/search.js

var constants = require('../../utils/constants.js')

Page({

  data: {
    keyword: '',
    list: [],
    pageIndex: 0,
    pageSize: 20
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.infoViewModal = this.selectComponent("#infoViewModal");
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
    this.data.pageIndex++;
    this.requestSearchList()
    console.log("onReachBottom: 上拉加载更多")
  },

  onShareAppMessage: function () {
  
  },

  networkRetry: function () {
    getApp().print("重试")
    this.requestSearchList()
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
    this.requestSearchList()
  },

  // 点赞
  like: function (res) {
    let item = res.currentTarget.dataset.item
    console.log(item)
    var collectType = item.isCollect + 1;
    this.requestCollect(item.id, collectType)

    let newList = this.data.list
    // 更新列表数据
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].id == item.id) {
        if (newList[i].isCollect == 0) {
          newList[i].isCollect = 1
          newList[i].supportCount++
        } else {
          newList[i].isCollect = 0
          newList[i].supportCount--
        }
        break
      }
    }
    this.setData({
      list: newList
    })
  },


  refreshNewsData: function (data) {
    var newList = []
    if (this.data.pageIndex == 0) {
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

  requestSearchList: function () {
    let that = this
    if (that.data.pageIndex == 0) {
      that.infoViewModal.showLoadingView()
    }
    var token = getApp().globalData.userToken
    var keyword = that.data.keyword
    wx.request({
      url: constants.searchList,
      data: {
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize,
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
          if (that.data.pageIndex == 0) {
            that.infoViewModal.showErrorView()
          }
        }
      },
      fail: function (res) {
        if (that.data.pageIndex == 0) {
          that.infoViewModal.showErrorView()
        }
      }
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