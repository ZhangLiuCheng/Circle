// pages/myLike/myLike.js

var constants = require('../../utils/constants.js')
var util = require('../../utils/util.js')

Page({
  data: {
    list: [],
    pageIndex: 0,
    pageSize: 20
  },

  onLoad: function () {
  },

  onReady: function () {
    this.infoViewModal = this.selectComponent("#infoViewModal");
    this.loadmoreViewModal = this.selectComponent("#loadmoreViewModal");
    this.requestMyCollectionList()
  },

  onPullDownRefresh: function () {
    this.data.pageIndex = 0;
    this.requestMyCollectionList()
  },

  onReachBottom: function () {
    this.data.pageIndex++;
    this.requestMyCollectionList()
  },

  onShareAppMessage: function () {
  
  },

  networkRetry: function () {
    this.requestMyCollectionList()
  },

  loadmoreRetry: function () {
    getApp().print("加载更多重试")
    this.data.pageIndex++
    this.requestMyCollectionList()
  },

  detail: function (res) {
    let item = res.currentTarget.dataset.item
    wx.navigateTo({
      url: '../detail/detail?id=' + item.id,
    })
  },

  // 举报
  report: function (res) {
    console.log(res.currentTarget.dataset.item)

    wx.showActionSheet({
      itemList: ['信息不可靠', '其他'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../report/report',
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  // 点赞
  like: function (res) {

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.data.refreshMainList = true

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

  requestMyCollectionList: function () {
    var that = this
    if (that.data.pageIndex == 0) {
      that.infoViewModal.showLoadingView()
    } else {
      that.loadmoreViewModal.showLoadingView()
    }
    var token = getApp().globalData.userToken
    wx.request({
      url: constants.myCollection,
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
          requestFail(res)
        }
      },
      fail: function (res) {
        wx.stopPullDownRefresh()
        requestFail(res)
      }
    })

    function requestFail(res) {
      if (that.data.pageIndex == 0) {
        that.infoViewModal.showErrorView()
      } else {
        that.data.pageIndex--
        that.loadmoreViewModal.showErrorView()
      }
    }
  },

  refreshNewsData: function (newsData) {
    var listData = util.formatNewsType(newsData)
    var newList = []
    if (this.data.pageIndex == 0) {
      newList = listData
    } else {
      newList = this.data.list.concat(listData)
    }
    this.setData({
      list: newList,
    })

    var empty = this.data.list.length <= 0;
    if (empty) {
      this.infoViewModal.showEmptyView('暂无收藏')
    } else {
      this.infoViewModal.hideInfoView()
    }

    // 最后一页数据
    if (listData.length < this.data.pageSize) {
      this.loadmoreViewModal.showEmptyView()
    }
    if (listData.length == 0) {
      this.data.pageIndex--
    }
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