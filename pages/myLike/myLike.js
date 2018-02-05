// pages/myLike/myLike.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 1,
        message: "周围停车场太黑了,一个小时七元,有图有真相！！！",
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
        id: 3,
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
    ]
  },

  onLoad: function () {
    console.log('onLoad')
    var listData = this.data.list;
    for (var i = 0; i < listData.length; i++) {
      var item = listData[i]
      var imageSize = item.imageUrls.length
      if (imageSize < 3) {
        item.type = imageSize;
      } else if (imageSize == 3) {
        item.type = 2;
      } else if (imageSize > 3) {
        item.type = 4;
      }
      // 拷贝图片地址
      for (var j = 0; j < item.type; j++) {
        item.showImageUrls[j] = item.imageUrls[j]
      }
    }
    this.setData({
      list: listData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})