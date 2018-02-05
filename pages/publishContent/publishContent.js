// pages/publish.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk1/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    addressName: '',
    latitude: 0,
    longitude: 0,
    imageList: [],
    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  onLoad: function (option) {
    console.log(option.id);
    qqmapsdk = new QQMapWX({
      key: 'QTVBZ-N3WWU-RSRVL-BAXSY-JRBC3-ZPFN7'
    });
    this.setLocation();
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

  address: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log("解码前：")
        console.log(res)
        var addressName = res.name;
        if (addressName == undefined) {
          addressName = "解析失败，请重新选择地址"
        }
        that.setData({
          addressName: addressName,
          latitude: res.latitude,
          longitude: res.longitude
        })

        // that.reverseGeocoder(res.latitude, res.longitude)
      },
      fail: function () {
        wx.getSetting({
          success: res => {
            if (false == res.authSetting['scope.userLocation']) {
              console.log("拒绝授权")
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.userLocation']) {
                    console.log('授权成功')
                    that.setLocation()
                  }
                }
              })
            }
          }
        })
      }
    })
  },

  // 设置地址
  setLocation: function() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.reverseGeocoder(res.latitude, res.longitude)
      },
      fail: function (res) {
        that.setData({
          addressName: "设置地址"
        })
      }
    })
  },

  // 经纬度转地址
  reverseGeocoder: function (latitude, longitude) {
    var that = this;
    qqmapsdk.reverseGeocoder({
      // coord_type: 4,
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log("解码后：")
        console.log(res)
        that.setData({
          addressName: res.result.address,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng
        })
      }
    });
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
})