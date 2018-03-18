// pages/main/main.js
Page({

  data: {
    tabIndex : 0,
    refreshUserInfo: false,
    refreshMainList: false
  },

  onLoad: function (options) {
    
  },

  onShow: function () {
    if (this.myModal != undefined && this.data.refreshUserInfo) {
      getApp().print('刷新用户信息')
      this.data.refreshUserInfo = false
      this.myModal.refreshUserInfo()
    }

    if (this.homeModal != undefined && this.data.refreshMainList) {
      getApp().print('刷新首页数据')
      this.data.refreshMainList = false
      this.homeModal.refreshList()
    }
  },

  onShareAppMessage: function () {
      return {
        title: "TestTitle",
        desc: "TestMessage",
        path: 'pages/main/main'
      }
  },

  onReady: function () {
    this.homeModal = this.selectComponent("#homeModal");
    this.myModal = this.selectComponent("#myModal");
    this.publishOptionModal = this.selectComponent("#publishOptionModal");
    this.homeModal.showModal();
    this.setData({
      tabIndex: 0
    })
  },

  onReachBottom: function () {
    console.log('onReachBottom')
  },

  tabIndex:function(e) {
    this.homeModal.hiddenModal();
    this.myModal.hiddenModal();
    var idVar = e.currentTarget.id;
    if (idVar == 'home') {
      this.homeModal.showModal();
      this.setData({
        tabIndex: 0
      })
    } else {
      this.myModal.showModal();
      this.setData({
        tabIndex: 1
      })
    }
  },

  publish:function() {

    this.publishOptionModal.showModal();
  }
})