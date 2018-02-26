// pages/home/home.js
var util = require('../../utils/util.js')

var page = 0
var pageSize = 20

var requestNewsList = function (that, parentId, childId) {
  // console.log(parentId + " -- " + childId)
  that.infoViewModal.showLoadingView()
  wx.request({
    url: 'http://192.168.1.88:8081/newsList.json',
    data: {
      page: page,
      pageSize: pageSize
    },
    header: {
      'content-type': 'application/json'
    },
    dataType: 'json',
    success: function (res) {
      var data = res.data
      // 模拟数据为空，显示emptyView
      if (parentId == 1) {
          data.list = []
      }
      that.refreshNewsData(data.list)
    },
    fail: function (res) {
      that.infoViewModal.showErrorView()
    }
  })
}

Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }
  },

  data: {
    list: []
    /*
    list: [
      {
        id:1,
        message:"周围停车场太黑了,一个小时七元,有图有真相！！！",
        imageUrls: ["http://img1.3lian.com/2015/w7/85/d/101.jpg", "/images/test.png", "http://img1.3lian.com/2015/w7/85/d/101.jpg"],
        showImageUrls: [],
      },

      {
        id: 2,
        message: "李小奴与贾乃亮内幕,撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrls: ["/images/test.png"],
        showImageUrls: [],
      },

      {
        id:3,
        message: "xxx网络公司太坑爹了.里面太黑暗，无法语言描述,阿斯顿发好了阿斯顿发回来看阿瑟费去玩儿去玩儿阿斯顿发的方式阿斯顿发圈儿去玩儿阿斯顿发送到发送地方2请问日 u 去哦譬如破 iu 片【额外肉 i 去哦玩儿",
        imageUrls: ["http://img1.3lian.com/2015/w7/85/d/101.jpg", "/images/test.png", "http://img1.3lian.com/2015/w7/85/d/101.jpg", "/images/test.png", "/images/test.png"],
        showImageUrls: [],
      },
      {
        id: 4,
        message: "周围停车场太黑了,一个小时七元",
        imageUrls: ["/images/test.png", "http://img1.3lian.com/2015/w7/85/d/101.jpg"],
        showImageUrls: [],
      },

      {
        id: 5,
        message: "撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrls: ["http://img1.3lian.com/2015/w7/85/d/101.jpg"],
        showImageUrls: [],
      },

      {
        id: 6,
        message: "据韩国庆尚南道密阳消防署26日介绍，报警者称，当天在密阳世宗医院发生的火灾源于1层的急诊室。截至当天上午11时，火灾已造成百余人伤亡。遇难者主要被发现在1、2层。消防部门正在现场进行搜救工作。",
        imageUrls: [],
        showImageUrls: [],
      },
      {
        id: 7,
        message: "一个小时七元,太几把贵了啊，擦擦擦",
        imageUrls: ["http://img1.3lian.com/2015/w7/85/d/101.jpg", "/images/test.png", "http://img1.3lian.com/2015/w7/85/d/101.jpg", "/images/test.png"],
        showImageUrls: [],
      },

      {
        id: 8,
        message: "李小奴与贾乃亮内幕撒发送到发送地方撒发送到发asdfasdfasdfasd阿斯顿发送地方送地方撒发送发送地方撒发送发送分撒发送到发送分",
        imageUrls: [],
        showImageUrls: [],
      },
    ],
    */
  },
  
  ready: function() {
    this.infoViewModal = this.selectComponent("#infoViewModal");
    requestNewsList(this, 0, 0)
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

    scrollToTop: function (res) {
      console.log("scrollToTop: 下拉刷新")
    },

    scrollToBottom: function(res) {
      console.log("scrollToBottom: 上拉加载更多")
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

    onKindChange: function (res) {
      var parentId = res.detail.parentId
      var childId = res.detail.childId
      page++;
      requestNewsList(this, parentId, childId)
    },

    refreshNewsData: function (newsData) {
      var listData = util.formatNewsType(newsData)
      this.setData({
        list: listData,
      })

      var empty = listData.length <= 0;
      if (empty) {
        this.infoViewModal.showEmptyView('暂无数据，请查看其他分类')
      } else {
        this.infoViewModal.hideInfoView()
      }
    },

    networkRetry: function () {
      console.log("重试 ")
    }

    /*
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
    */
  },
})
