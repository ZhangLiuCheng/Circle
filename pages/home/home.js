// pages/home/home.js
Component({
  
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }
  },

  data: {
    list: [
      {
        id:1,
        message:"周围停车场太黑了,一个小时七元,有图有真相！！！",
        imageUrls: ["http://img1.3lian.com/2015/w7/85/d/101.jpg", "image/test.png", "http://img1.3lian.com/2015/w7/85/d/101.jpg"],
        type:2
      },

      {
        id: 2,
        message: "李小奴与贾乃亮内幕,撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrls: ["image/test.png"],
        type: 0
      },

      {
        id:3,
        message: "xxx网络公司太坑爹了.里面太黑暗，无法语言描述",
        imageUrls: [],
        type: 0
      },
      {
        id: 1,
        message: "周围停车场太黑了,一个小时七元",
        imageUrls: ["image/test.png", "http://img1.3lian.com/2015/w7/85/d/101.jpg"],
        type: 2
      },

      {
        id: 2,
        message: "撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrls: ["http://img1.3lian.com/2015/w7/85/d/101.jpg"],
        type: 1
      },

      {
        id: 3,
        title: "xxx网络公司太坑爹了",
        message: "里面太黑暗，无法语言描述",
        type: 0
      },
      {
        id: 1,
        title: "周围停车场太黑了",
        message: "一个小时七元",
        imageUrls: ["http://img1.3lian.com/2015/w7/85/d/101.jpg", "image/test.png", "http://img1.3lian.com/2015/w7/85/d/101.jpg", "image/test.png"],
        type: 2
      },

      {
        id: 2,
        title: "李小奴与贾乃亮内幕",
        message: "撒发送到发送地方撒发送到发asdfasdfasdfasd阿斯顿发送地方送地方撒发送发送地方撒发送发送分撒发送到发送分",
        type: 0
      },

      {
        id: 3,
        title: "xxx网络公司太坑爹了",
        message: "里面太黑暗，无法语言描述",
        imageUrls: ["image/test.png"],
        type: 1
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal: function () {
      this.setData({
        modalHidden: false
      })
    },

    hiddenModal: function () {
      this.setData({
        modalHidden: true
      })
    },

    report: function(res) {
      console.log(res.currentTarget.dataset.item)
      wx.showActionSheet({
        itemList: ['信息不真实', '恶意重伤', '其他'],
        success: function (res) {
          console.log(res.tapIndex)
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    },

    // 分享
    share: function (res) {
      console.log(res.currentTarget.dataset.item)
      wx.showShareMenu({
        withShareTicket: true
      })
    },

    // 评论
    commet:function(res) {
      console.log(res.currentTarget.dataset.item)
      wx.showToast({
        title: '敬请期待',
        icon: 'none',
        duration: 1500
      })
    },

    // 点赞
    like: function (res) {
      console.log(res.currentTarget.dataset.item)
    },
  }
})
