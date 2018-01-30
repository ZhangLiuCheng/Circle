// pages/search/search.js
var WxSearch = require('../../libs/wxSearch/wxSearch.js')

Page({

  data: {
    list: [
      {
        id: 1,
        message: "周围停车场太黑了,一个小时七元,有图有真相！！！"
      },

      {
        id: 2,
        message: "李小奴与贾乃亮内幕,撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分"
      },

      {
        id: 3,
        message: "xxx网络公司太坑爹了.里面太黑暗，无法语言描述,阿斯顿发好了阿斯顿发回来看阿瑟费去玩儿去玩儿阿斯顿发的方式阿斯顿发圈儿去玩儿阿斯顿发送到发送地方2请问日 u 去哦譬如破 iu 片【额外肉 i 去哦玩儿"
      },
      {
        id: 4,
        message: "周围停车场太黑了,一个小时七元"
      },

      {
        id: 5,
        message: "撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
      },

      {
        id: 6,
        message: "据韩国庆尚南道密阳消防署26日介绍，报警者称，当天在密阳世宗医院发生的火灾源于1层的急诊室。截至当天上午11时，火灾已造成百余人伤亡。遇难者主要被发现在1、2层。消防部门正在现场进行搜救工作。"
      },
      {
        id: 7,
        message: "一个小时七元,太几把贵了啊，擦擦擦"
      },

      {
        id: 8,
        message: "李小奴与贾乃亮内幕撒发送到发送地方撒发送到发asdfasdfasdfasd阿斯顿发送地方送地方撒发送发送地方撒发送发送分撒发送到发送分"
      },
    ]
  },

  onLoad: function (options) {
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);

  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})