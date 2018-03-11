// pages/userInfo/userInfo.js

var utils = require('../../utils/util.js')
var constants = require('../../utils/constants.js')

var defaultAvatar = '/images/avatar_default.png'

Page({

  data: {
    nickName: '',
    headUrl: '',
    avatarPath: '/images/avatar_default.png',
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      nickName: options.nickName,
      headUrl: options.headUrl,
      avatarPath: options.headUrl
    })
  },

  onReady: function () {
  
  },

  onUnload: function () {
  
  },

  onShareAppMessage: function () {
  
  },

  bindNicknameInput: function (e) {
    this.data.nickName = e.detail.value
  },

  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['camera', 'album'],
      sizeType: ['compressed'],
      count: 1,
      success: function (res) {
        wx.showLoading({
          title: '图片上传中',
          mask: true
        })
        var imagePath = res.tempFilePaths[0]
        that.requestUploadFile(imagePath, function (success, filePath, imageUrl) {
          console.log(imagePath + '  -------  ' + imageUrl)
          wx.hideLoading()
          if (success) {
            that.setData({
              avatarPath: filePath
            })
            that.data.headUrl = imageUrl
          } else {
            setTimeout(function () {
              wx.showToast({
                title: imageUrl,
                image: '../../images/error.png'
              })
            }.bind(that), 1000)
          }
        })
      }
    })
  },

  headError: function () {
    this.setData({
      avatarPath: defaultAvatar
    })
  },

  save: function () {
    if (this.data.nickName.length < 0) {
      utils.showToast('昵称不能为空')
      return
    }
    this.requestSave()
  },

  requestSave: function () {
    wx.showLoading({
      title: '保存中',
      mask: true
    })
    var that = this
    var userToken = getApp().globalData.userToken
    wx.request({
      method: "POST",
      url: constants.updateUser,
      data: {
        token: userToken,
        nickName: that.data.nickName,
        headUrl: that.data.headUrl
      },
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.code == 0) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.data.refreshUserInfo = true
          wx.navigateBack()
        } else {
          utils.showToast(res.data.message)
        }
      },
      fail: function () {
        utils.showToast("保存失败")
      },
      complete: function () {
        wx.hideLoading()
      }
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
      success: function (res) {
        getApp().print(res)
        if (res.statusCode == 200) {
          var result = JSON.parse(res.data)
          if (result.code == 0) {
            uploadCallback(true, filePath, result.data[0])
          } else {
            uploadCallback(true, filePath, result.message)
          }
        } else {
          uploadCallback(false, filePath, "上传图片不能超过4M")
        }
      },
      fail: function (res) {
        getApp().print(res)
        uploadCallback(false, filePath, '上传超时')
      }
    })
  }
})