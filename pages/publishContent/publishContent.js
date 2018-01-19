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
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //     console.log(res)
    //   }
    // })
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
  },

  address: function() {
    wx.chooseLocation({
      success:function(res) {
        console.log(res)
      },
      fail:function() {
        console.log("fail ")
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userLocation']) {
              console.log("同意授权")
            } else {
              console.log("拒绝授权")
              wx.openSetting({
                success: (res) => {
                  console.log("openSetting: " + res.authSetting['scope.userLocation'])

                  /*
                   * res.authSetting = {
                   *   "scope.userInfo": true,
                   *   "scope.userLocation": true
                   * }
                   */
                }
              })
            }
          }
        })
      },
      complete:function() {
        
      }
    })
  }
})