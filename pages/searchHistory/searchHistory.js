// pages/searchHistory/searchHistory.js
var util = require('../../utils/util.js')
var key_searchHistory = 'searchHistoryKey'

Component({
  
  properties: {

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
  },

  data: {
    open: true,
    searchEnable: false,
    keyword: '',
    searchHotList: ['地球到底有多大', '男人为什么那么坏', 'hihi', '上海什么地方比较好玩', 'xxx公司怎么样？'],
    // searchHistoryList:['贾乃亮', 'innotech', '花儿为什么那么红', '上海什么地方比较好玩', 'xxx公司怎么样？']
    searchHistoryList: []
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
      this.data.searchHistoryList.unshift(this.data.keyword)
      this.requestSearch(this.data.keyword)
      this.resetSearchHistoryData()
    },

    hotCatch: function (e) {
      var item = e.currentTarget.dataset.item;
      this.requestSearch(item)
    },

    historyCatch: function (e) {
      var item = e.currentTarget.dataset.item;
      this.setData({
        keyword: item
      })
      this.searchBtnState()
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
