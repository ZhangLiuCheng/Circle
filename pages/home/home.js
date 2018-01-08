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
        title:"周围停车场太黑了",
        message:"一个小时七元"
      },

      {
        id: 2,
        title: "李小奴与贾乃亮内幕",
        message: "撒发送到发送地方撒发送到发送地方撒发送发送地方撒发送发送分撒发送到发送分"
      },

      {
        id:3,
        title: "xxx网络公司太坑爹了",
        message: "里面太黑暗，无法语言描述"
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
    }
  }
})
