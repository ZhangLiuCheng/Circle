// pages/home/home.js
var util = require('../../utils/util.js')
var constants = require('../../utils/constants.js')
var http = require('../../utils/http.js')

Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }
  },

  data: {
    list: [],
    parentId: 0,
    childId: 0,
    pageIndex: 0,
    pageSize: 20
  },

  ready: function () {
    this.infoViewModal = this.selectComponent("#infoViewModal");
    this.loadmoreViewModal = this.selectComponent("#loadmoreViewModal");

    this.requestNewsList(0, 0)
  },

  /**
   * 组件的方法列表
   */
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

    scrollToTop: function (res) {
      // console.log("scrollToTop: 下拉刷新")
    },

    scrollToBottom: function (res) {
      // console.log("scrollToBottom: 上拉加载更多")
      this.data.pageIndex++;
      this.requestNewsList(this.data.parentId, this.data.childId)
    },

    detail: function (res) {
      let item = res.currentTarget.dataset.item
      wx.navigateTo({
        url: '../detail/detail?id=' + item.id,
      })
    },

    onKindChange: function (res) {
      this.data.pageIndex = 0
      this.data.parentId = res.detail.parentId
      this.data.childId = res.detail.childId
      this.setData({
        list: []
      })
      this.requestNewsList(this.data.parentId, this.data.childId)
    },

    refreshList: function () {
      this.requestNewsList(this.data.parentId, this.data.childId)
    },

    networkRetry: function () {
      getApp().print("网络重试")
      this.requestNewsList(this.data.parentId, this.data.childId)
    },

    loadmoreRetry: function () {
      getApp().print("加载更多重试")
      this.data.pageIndex++
      this.requestNewsList(this.data.parentId, this.data.childId)
    },

    // 举报
    report: function (res) {
      let item = res.currentTarget.dataset.item
      let that = this
      wx.showActionSheet({
        itemList: ['信息不可靠', '其他'],
        success: function (res) {
          if (res.tapIndex == 0) {
            that.requestReport(item)
          } else if (res.tapIndex == 1) {
            wx.navigateTo({
              url: '../report/report?id=' + item.id,
            })
          }
        }
      })
    },

    requestReport: function (item) {
      http.requestNewsReport(getApp().globalData.userToken, item.id,
        '消息不可靠', '', function (success, msg) {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 1500
          })
        })
    },
    
    /*
    // 分享
    share: function (res) {
      console.log(res.currentTarget.dataset.item)
      wx.showShareMenu({
        withShareTicket: true
      })
    },

    // 评论
    commet:function(res) {
      console.log(res.currentTarget.dataset.item)
      wx.showToast({
        title: '敬请期待',
        icon: 'none',
        duration: 1500
      })
    },
    */

    // 点赞
    like: function (res) {
      let item = res.currentTarget.dataset.item
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

    requestNewsList: function (parentId, childId) {
      var that = this
      var app = getApp()
      if (that.data.pageIndex == 0) {
        that.infoViewModal.showLoadingView()
      } else {
        that.loadmoreViewModal.showLoadingView()
      }
      wx.request({
        url: constants.newsListUrl,
        data: {
          pageIndex: that.data.pageIndex,
          pageSize: that.data.pageSize,
          superType: that.data.parentId,
          newsType: that.data.childId,
          latitude: app.globalData.location.latitude,
          longitude: app.globalData.location.longitude
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // getApp().print(res)
          if (res.statusCode == 200 && res.data.code == 0) {
            var list = res.data.data;
            that.refreshNewsData(list)
          } else {
            requestFail(res)
          }
        },
        fail: function (res) {
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
        this.infoViewModal.showEmptyView('暂无数据，请查看其他分类')
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
  },
})
