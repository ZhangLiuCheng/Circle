// pages/publish.js
Page({
  data: {
    imageList: [],
    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  onLoad: function (option) {
    console.log(option.id);
  },

  onReady: function () {
    this.dialogModal = this.selectComponent("#dialogModal");
  },

  OnConfirm: function (e) {
    console.log("OnConfirm  " + e.detail.key + " --  " + e.detail.key2)
  },

  showCustonModal: function () {
    this.dialogModal.showLogin()
  },

  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['camera', 'album'],
      sizeType: ['compressed', 'original'],
      count: this.countIndex,
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  }
})