// pages/searchHistory/searchHistory.js
Component({
  
  properties: {

  },

  data: {
    open: false,
    searchEnable: false,
    keyword: ''
  },

  methods: {

    searchTextInput: function(e) {
      // console.log(e.detail.value.length)
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

    searching: function () {
      console.log('searching')
      this.setData({
        keyword:''
      })
      this.searchBtnState()
      this.closePanel()
    },

    // 设置<搜索>按钮是否可点击状态
    searchBtnState: function() {
      var enable = this.data.keyword.length > 0
      if (enable != this.data.searchEnable) {
        this.setData({
          searchEnable: enable
        })
      }
    },

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
  }
})
