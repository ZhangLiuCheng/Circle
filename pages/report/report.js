// pages/report/report.js

var http = require('../../utils/http.js')
var util = require('../../utils/util.js')

Page({

  data: {
    newsId: '',
    contentValue: '',
    contactValue: ''
  },

  onLoad: function (options) {
    this.data.newsId = options.id
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
      util.showToast('请输入举报内容')
      return
    } else if (this.data.contactValue.length <= 0) {
      util.showToast('请输入您的联系方式')
      return
    }
    this.requestReport()
  },

  requestReport: function () {
    wx.showLoading({
      title: '提交中',
    })
    http.requestNewsReport(getApp().globalData.userToken, this.data.newsId,
      this.data.contentValue, this.data.contactValue, function (success, msg) {
        wx.hideLoading()
        if (success) {
          wx.showModal({
            content: '感谢您的举报，我们将尽快处理。',
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