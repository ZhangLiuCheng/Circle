// pages/publish.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk1/qqmap-wx-jssdk.min.js');
var qqmapsdk;

var utils = require('../../utils/util.js')
var constants = require('../../utils/constants.js')

var tempImageUrls = new Map()

Page({
  data: {
    newsType: '',
    message: '',
    addressName: '',
    latitude: 0,
    longitude: 0,
    isAnonymous: 0,
    hiddenAddImage: false,
    imageList: [],
    imageSize: 6,
  },

  onLoad: function (option) {
    this.data.newsType = option.id
    qqmapsdk = new QQMapWX({
      key: 'QTVBZ-N3WWU-RSRVL-BAXSY-JRBC3-ZPFN7'
    });
    this.setLocation();
  },

  valueChange: function (e) {
    this.setData({
      message: e.detail.value
    })
  },

  switchChange: function (e) {
    this.data.isAnonymous = e.detail.value ? 1 : 0
  },

  // 发布
  publish: function () {
    if (this.data.message.length < 20) {
      utils.showToast('内容不能小于20字')
      return
    }
    this.requestAddNews()   
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
    var imgCount = this.data.imageSize - this.data.imageList.length
    wx.chooseImage({
      count: imgCount,
      sourceType: ['camera', 'album'],
      sizeType: ['compressed' /*, 'original'*/],
      success: function (res) {
        // console.log(res) 
      
        wx.showLoading({
          title: '图片上传中',
          mask: true
        })
        var successCount = 0
        var failedCount = 0
        var imageFilePaths = res.tempFilePaths
        var uploadFailedList = []
        var errorMsg = ''
        for (var i = 0; i < imageFilePaths.length; i++) {
          var imagePath = imageFilePaths[i]
          that.requestUploadFile(imagePath, function (success, filePath, imageUrl) {
            if (success) {
              successCount++
              tempImageUrls.set(filePath, imageUrl)
            } else {
              failedCount ++
              uploadFailedList.push(imagePath)
              errorMsg = imageUrl
              console.log(imageUrl)
            }
            if ((successCount + failedCount) == imageFilePaths.length) {
              wx.hideLoading()
              if (uploadFailedList.length > 0) {
                setTimeout(function(){
                  wx.showToast({
                    title: errorMsg,
                    image: '../../images/error.png'
                  })
                }.bind(that), 1000)
                  
                for (var j = 0; j < uploadFailedList.length; j++) {
                  imageFilePaths.remove(uploadFailedList[j])
                }
              }

              var images = that.data.imageList.concat(imageFilePaths)
              var hiddenButton = images.length >= that.data.imageSize
              that.setData({
                imageList: images,
                hiddenAddImage: hiddenButton
              })
            }
          })
        } 
      }
    })
  },

  deleteImage: function (e) {
    var current = e.target.dataset.src
    var that = this
    console.log(current)
    wx.showModal({
      title: '提示',
      content: '是否删除这张图片',
      success: function (res) {
        if (res.confirm) {
          var images = that.data.imageList
          images.remove(current)
          var hiddenButton = images.length >= that.data.imageSize
          that.setData({
            imageList: images,
            hiddenAddImage: hiddenButton
          })
          console.log('用户点击确定')
        }
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

  // 上传图片到服务器
  requestUploadFile: function (filePath, uploadCallback) {
    wx.uploadFile({
      url: constants.uploadFile,
      filePath: filePath,
      name: 'file',
      header: {
        "content-type": "multipart/form-data"
      },
      success: function(res) {
        getApp().print(res)
        if (res.statusCode == 200) {
          var result = JSON.parse(res.data)
          if (result.code == 0 ) {
            uploadCallback(true, filePath, result.data[0])
          } else {
            uploadCallback(true, filePath, result.message)
          }
        } else {
          uploadCallback(false, filePath, "上传图片不能超过4M")
        }
      },
      fail: function(res) {
        getApp().print(res)
        uploadCallback(false, filePath, '上传超时')
      }
    })
  },

  requestAddNews: function () {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    var that = this
    var userToken = getApp().globalData.userToken
    var imagePaths = this.data.imageList
    var urls = ''
    for (var i = 0; i < imagePaths.length; i++ ) {
      var url = tempImageUrls.get(imagePaths[i])
      if (url != undefined) {
        urls +=url + ','
      }
    }
    if (urls.length > 0) {
      urls = urls.substring(0, urls.length - 1)
    }
    console.log(urls)
    wx.request({
      method: "POST",
      url: constants.newsAdd,
      data: {
        token: userToken,
        newsType: that.data.newsType,
        message: that.data.message,
        address: that.data.addressName,
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        isAnonymous: that.data.isAnonymous,
        images: urls
      },
      header: {
        // 'content-type': 'application/json'
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.code == 0) {
          wx.showModal({
            title: '发布成功',
            content: '审核需要1个工作日左右，可以在个人中心里面查看审核状态',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack()
              }
            }
          })
        } else {
          utils.showToast("提交失败")
        }
      },
      fail: function () {
        utils.showToast("提交失败")
      },
      complete: function () {
        console.log("隐藏")
        wx.hideLoading()
      }
    })
  }
})