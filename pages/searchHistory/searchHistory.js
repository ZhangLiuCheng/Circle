// pages/searchHistory/searchHistory.js
var util = require('../../utils/util.js')
var constants = require('../../utils/constants.js')

var key_searchHistory = 'searchHistoryKey'

Component({
  
  properties: {

  },

  data: {
    open: true,
    searchEnable: false,
    keyword: '',
    // searchHotList: ['地球到底有多大', '男人为什么那么坏', 'hihi', '上海什么地方比较好玩', 'xxx公司怎么样？'],
    // searchHistoryList:['贾乃亮', 'innotech', '花儿为什么那么红', '上海什么地方比较好玩', 'xxx公司怎么样？']
    searchHistoryList: []
  },

  ready: function () {
    var that = this
    wx.getStorage({
      key: key_searchHistory,
      success: function (res) {
        that.setData({
          searchHistoryList: res.data
        })
      }
    })

    var token = getApp().globalData.userToken
    wx.request({
      url: constants.searchHotKeyword,
      data: {
        token: token
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.code == 0) {
          that.setData({
            searchHotList: res.data.data
          })
        }
      },
      fail: function (res) {

      }
    })
  },

  methods: {
    showPanel: function () {
      this.setData({
        open: true
      })
    },

    // 关闭选择标签
    closePanel: function () {
      this.setData({
        open: false
      })
    },

    // 点击空白的地方
    touchPanel: function () {
      this.closePanel()
    },

    searchTextInput: function(e) {
      this.setData({
        keyword: e.detail.value
      })
      this.searchBtnState()
    },

    searchTextFocus:function (e) {
      this.showPanel();
    },

    // 输入框点击键盘搜索按钮
    searchTextConfirm: function (e) {
      this.searching()
    },

    // 点击搜索按钮
    searching: function () {
      var keyword = this.data.keyword
      if (keyword.length == 0) {
        this.closePanel()
        // TODO 触发取消
        this.triggerEvent("searchCancel")
      } else {
        this.data.searchHistoryList.unshift(keyword)
        this.requestSearch(keyword)
        this.resetSearchHistoryData()
      }
    },

    hotCatch: function (e) {
      var item = e.currentTarget.dataset.item;
      this.requestSearch(item)
    },

    historyCatch: function (e) {
      var item = e.currentTarget.dataset.item;
      // this.setData({
      //   keyword: item
      // })
      // this.searchBtnState()
      this.requestSearch(item)
    },

    historyDelete: function (e) {
      var item = e.currentTarget.dataset.item;
      this.data.searchHistoryList.remove(item)
      this.resetSearchHistoryData()
    },

    // 请求网络搜索
    requestSearch: function (keyword) {
      this.setData({
        keyword: ''
      })
      this.searchBtnState()
      this.closePanel()

      // TODO 触发搜索
      this.triggerEvent("searchTo", keyword)
    },

    // 设置<搜索>按钮是否可点击状态
    searchBtnState: function () {
      var enable = this.data.keyword.length > 0
      if (enable != this.data.searchEnable) {
        this.setData({
          searchEnable: enable
        })
      }
    },

    // 保存搜索历史数据和刷新ui
    resetSearchHistoryData: function () {
      var newData = this.data.searchHistoryList.slice(0, 5)
      this.setData({
        searchHistoryList: newData
      })
      wx.setStorage({
        key: key_searchHistory,
        data: this.data.searchHistoryList
      })
    }
  },
})
