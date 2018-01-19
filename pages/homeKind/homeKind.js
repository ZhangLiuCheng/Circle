// pages/homeKind/homeKind.js
Component({

  properties: {

  },

  data: {
    open: false,
    currentTab: 0,
    animOption: {},
    animArrow: {},
  },

  methods: {
    swichNav: function (e) {
      var that = this;
      var curId = e.currentTarget.dataset.current;

      if (this.data.currentTab == curId) {
        var realOpen = this.data.open ? false : true;
        that.setData({
          open: realOpen
        })

        // 展示箭头动画
        var animation = wx.createAnimation({
          timingFunction: 'ease', duration: 500
        })
        if (realOpen) {
          animation.rotate(180).step()
        } else {
          animation.rotate(0).step()
        }
        this.setData({
          animArrow: animation.export()
        })
      } else {
        this.closePanel(curId);
      }
    },

    // 关闭选择标签
    closePanel: function(curId) {
      console.log("curId: " + curId)
      this.setData({
        open: false,
        currentTab: curId
      })
      // 重置箭头动画
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'step-start',
      })
      animation.rotate(0).step()
      this.setData({
        animArrow: animation.export()
      })
    },

    // 点击空白的地方
    touchPanel:function() {
      this.closePanel(this.data.currentTab)
    },

    search: function () {
      console.log("search")
      wx.navigateTo({
        url: '../search/search',
      })
    },
  }
})
