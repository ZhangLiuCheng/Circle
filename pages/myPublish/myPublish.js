// pages/myPublish/myPublish.js

var constants = require('../../utils/constants.js')

Page({

  data: {
    list: [],
    pageIndex: 0,
    pageSize: 20
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.infoViewModal = this.selectComponent("#infoViewModal");
    this.requestMyNewsList()
  },

  onPullDownRefresh: function () {
    this.data.pageIndex = 0;
    this.requestMyNewsList()
  },
 
  onReachBottom: function () {
    this.data.pageIndex++;
    this.requestMyNewsList()
  },

  onShareAppMessage: function () {
  
  },

  networkRetry: function () {
    this.requestMyNewsList()
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

  requestMyNewsList: function () {
    var that = this
    if (that.data.pageIndex == 0) {
      that.infoViewModal.showLoadingView()
    }
    var token = getApp().globalData.userToken
    wx.request({
      url: constants.myNews,
      data: {
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize,
        token: token
      },
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        getApp().print(res)
        wx.stopPullDownRefresh()
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
        wx.stopPullDownRefresh()
        if (that.data.pageIndex == 0) {
          that.infoViewModal.showErrorView()
        }
      }
    })
  },

  // 点赞
  like: function (res) {

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.data.refreshMainList = true

    let item = res.currentTarget.dataset.item
    let collectType = 0
    if (item.isCollect == 0 || item.isCollect == undefined) {
      collectType = 1
    } else {
      collectType = 2
    }

    this.requestCollect(item.id, collectType)
    let newList = this.data.list
    // 更新列表数据
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].id == item.id) {
        if (newList[i].isCollect == 0 || item.isCollect == undefined) {
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