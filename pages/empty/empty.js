// pages/empty/empty.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    modalHidden: {
      type: Boolean,
      value: false
    },

    modalMessage: {
      type: String,
      value: '暂无数据'
    },

    modalTop: {
      type:Int8Array,
      value:0
    },

    modalBottom: {
      type: Int8Array,
      value: 0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
