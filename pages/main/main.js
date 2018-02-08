// pages/main/main.js
Page({

  data: {
    tabInex : 0
  },

  onLoad: function (options) {
    
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