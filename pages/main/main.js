// pages/main/main.js
Page({

  data: {
    tabInex : 0
  },

  onLoad: function (options) {
    
  },
  
  onReady: function () {
    this.homeModal = this.selectComponent("#homeModal");
    this.myModal = this.selectComponent("#myModal");
    this.homeModal.showModal();
    this.setData({
      tabIndex: 0
    })
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
    wx.navigateTo({
      url: '../publish/publish',
    })
  }
})