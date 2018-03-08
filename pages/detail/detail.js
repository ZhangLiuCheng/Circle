// pages/detail/detail.js

var constants = require('../../utils/constants.js')

var requestDetail = function (that) {
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
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    newsDetail: {}
    /*
    newsDetail: {
      id: 3,
      message: "xxx网络公司太坑爹了.里面太黑暗，无法语言描述,阿斯顿发好了阿斯顿发回来看阿瑟费去玩儿去玩儿阿斯顿发的方式阿斯顿发圈儿去玩儿阿斯顿发送到发送地方2请问日 u 去哦譬如破 iu 片【额外肉 i 去哦玩儿",
      imageUrls: ["http://img1.3lian.com/2015/w7/85/d/101.jpg", "/images/test2.png", "http://img1.3lian.com/2015/w7/85/d/101.jpg", "/images/test.png", "/images/test2.png"],
    }
    */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.infoViewModal = this.selectComponent("#infoViewModal");
    requestDetail(this)
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  },

  networkRetry: function () {
    requestDetail(this)
  },
})