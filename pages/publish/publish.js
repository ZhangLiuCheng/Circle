// pages/publish.js
Page({

  OnConfirm: function (e) {
    console.log("OnConfirm  " + e.detail.key + " --  " + e.detail.key2)
  },

  /**
   * 页面的初始OnConfirm数据
   */
  data: {
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    }
  },

  onReady: function() {
    this.loginModal = this.selectComponent("#loginModal");
    console.log("onReady  " + this.loginModal + this.data.is_modal_Msg)
  },

  showCustonModal: function() {
    this.loginModal.showLogin()
  }
})