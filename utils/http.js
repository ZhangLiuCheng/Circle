
var constants = require('constants.js')

// 举报news
var requestNewsReport = function (token, newsId, message, account, listener) {
  var that = this
  var app = getApp()
  wx.request({
    method: "POST",
    url: constants.newsReport,
    data: {
      token: token,
      newsId: newsId,
      message: message,
      account: account
    },
    header: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    success: function (res) {
      getApp().print(res)
      if (res.statusCode == 200 && res.data.code == 0) {
        listener(true, '感谢您的举报，我们将尽快处理')
      } else {
        listener(false, res.data.message == undefined ? "服务器异常" : res.data.message)
      }
    },
    fail: function (res) {
      listener(false, '网络或服务器异常')
    }
  })
}

// 用户反馈
var requestFeedback = function (token, message, account, listener) {
  var that = this
  var app = getApp()
  wx.request({
    method: "POST",
    url: constants.feedback,
    data: {
      token: token,
      message: message,
      account: account
    },
    header: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    success: function (res) {
      getApp().print(res)
      if (res.statusCode == 200 && res.data.code == 0) {
        listener(true, '感谢您的建议反馈，我们将尽快处理')
      } else {
        listener(false, res.data.message == undefined ? "服务器异常" : res.data.message)
      }
    },
    fail: function (res) {
      listener(false, '网络或服务器异常')
    }
  })
}

module.exports = {
  requestNewsReport: requestNewsReport,
  requestFeedback: requestFeedback,
}
