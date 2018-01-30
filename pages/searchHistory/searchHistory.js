// pages/searchHistory/searchHistory.js
Component({
  
  properties: {

  },

  data: {
    open: false,
  },

  methods: {
    swichNav: function (e) {
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
