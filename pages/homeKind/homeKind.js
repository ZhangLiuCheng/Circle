// pages/homeKind/homeKind.js
Component({
 
  properties: {

  },

  data: {
    currentTab: 0,
  },

  methods: {
    swichNav: function (e) {
      var that = this;
      if (this.data.currentTab === e.currentTarget.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.currentTarget.dataset.current
        })
      }
    },

    search:function() {
      console.log("search")
      wx.navigateTo({
        url: '../search/search',
      })
    }
  }
})
