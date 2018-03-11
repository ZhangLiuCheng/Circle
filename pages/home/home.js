// pages/home/home.js
var util = require('../../utils/util.js')
var constants = require('../../utils/constants.js')

var parentId = 0
var childId = 0
var pageIndex = 0
var pageSize = 20

var requestNewsList = function (that, parentId, childId) {
  var app = getApp()
  getApp().print("parentId:" + parentId + " , childId: " + childId + " , pageIndex: " + pageIndex)

  if (pageIndex == 0) {
    that.infoViewModal.showLoadingView()
  }
  wx.request({
    url: constants.newsListUrl,
    data: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      superType: parentId,
      newsType: childId,
      latitude: app.globalData.location.latitude,
      longitude: app.globalData.location.longitude
    },
    header: {
      'content-type': 'application/json'
    },
    // dataType: 'json',
    success: function (res) {
      getApp().print(res)
      if (res.statusCode == 200 && res.data.code == 0) {
        var list = res.data.data;
        getApp().print(list.length)
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

Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }
  },

  data: {
    list: []
  },
  
  ready: function() {
    this.infoViewModal = this.selectComponent("#infoViewModal");
    requestNewsList(this, 0, 0)
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
      console.log("scrollToTop: 下拉刷新")
    },

    scrollToBottom: function(res) {
      console.log("scrollToBottom: 上拉加载更多")
      pageIndex++;
      requestNewsList(this, parentId, childId)
    },

    report: function(res) {
      console.log(res.currentTarget.dataset.item)
      wx.showActionSheet({
        itemList: ['信息不真实', '恶意重伤', '其他'],
        success: function (res) {
          console.log(res.tapIndex)
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    },

    onKindChange: function (res) {
      pageIndex = 0
      parentId = res.detail.parentId
      childId = res.detail.childId
      this.setData({
        list: []
      })
      requestNewsList(this, parentId, childId)
    },

    refreshNewsData: function (newsData) {
      var listData = util.formatNewsType(newsData)
      var newList = []
      if (pageIndex == 0) {
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
    },

    networkRetry: function () {
      getApp().print("重试")
      requestNewsList(this, parentId, childId)
    }

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

    // 点赞
    like: function (res) {
      console.log(res.currentTarget.dataset.item)
    },
    */
  },
})
