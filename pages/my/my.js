// pages/my/my.js
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
    avatarPath:'/images/avatar_default.png',
    list: [
      {
        id: 'view',
        name: '信息',
        open: false,
        pages: ['我的发布', '浏览记录']
      }, {
        id: 'content',
        name: '设置',
        open: false,
        pages: ['系统消息', '清楚缓存', '关于']
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
    }
  }
})
