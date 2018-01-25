// pages/home/home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        id:1,
        message:"周围停车场太黑了,一个小时七元,有图有真相！！！",
        imageUrl:"http://img1.3lian.com/2015/w7/85/d/101.jpg"
      },

      {
        id: 2,
        message: "李小奴与贾乃亮内幕,撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrl: "image/test.png"
      },

      {
        id:3,
        message: "xxx网络公司太坑爹了.里面太黑暗，无法语言描述",
        imageUrl: "image/test1.png"
      },
      {
        id: 1,
        message: "周围停车场太黑了,一个小时七元",
        imageUrl: "image/test2.png"
      },

      {
        id: 2,
        message: "撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg"
      },

      {
        id: 3,
        title: "xxx网络公司太坑爹了",
        message: "里面太黑暗，无法语言描述",
      },
      {
        id: 1,
        title: "周围停车场太黑了",
        message: "一个小时七元",
        imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg"
      },

      {
        id: 2,
        title: "李小奴与贾乃亮内幕",
        message: "撒发送到发送地方撒发送到发asdfasdfasdfasd阿斯顿发送地方送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg"
      },

      {
        id: 3,
        title: "xxx网络公司太坑爹了",
        message: "里面太黑暗，无法语言描述",
        imageUrl: "image/test.png"
      },
      {
        id: 1,
        title: "周围停车场太黑了",
        message: "一个小时七元",
        imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg"
      },

      {
        id: 2,
        title: "李小奴与贾乃亮内幕",
        message: "撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
      },

      {
        id: 3,
        title: "xxx网络公司太坑爹了",
        message: "里面太黑暗，无法语言描述",
        imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg"
      },
      {
        id: 1,
        title: "周围停车场太黑了",
        message: "一个小时七元",
        imageUrl: "image/test.png"
      },

      {
        id: 2,
        title: "李小奴与贾乃亮内幕",
        message: "撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg"
      },

      {
        id: 3,
        title: "xxx网络公司太坑爹了",
        message: "里面太黑暗，无法语言描述",
        imageUrl: "image/test.png"
      },
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
