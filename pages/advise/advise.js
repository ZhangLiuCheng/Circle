// pages/advise/advise.js

var http = require('../../utils/http.js')
var util = require('../../utils/util.js')

Page({

  data: {
    contentValue: '',
    contactValue: ''
  },

  onLoad: function (options) {
  
  },

  onReady: function () {
  
  },

  contentValueChnage: function (e) {
    this.setData({
      contentValue: e.detail.value
    })
  },

  contactValueChnage: function (e) {
    this.setData({
      contactValue: e.detail.value
    })
  },

  submit: function () {
    if (this.data.contentValue.length <= 0) {
      util.showToast('请输入您的建议反馈')
      return
    } else if (this.data.contactValue.length <= 0) {
      util.showToast('请输入您的联系方式')
      return
    }
    this.requestFeedback()
  },

  requestFeedback: function () {
    wx.showLoading({
      title: '提交中',
    })
    http.requestFeedback(getApp().globalData.userToken, this.data.contentValue, 
        this.data.contactValue, function (success, msg) {
        wx.hideLoading()
        if (success) {
          wx.showModal({
            content: '感谢您的建议反馈，我们将尽快处理',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 1500
          })
        }
      })
  },
})