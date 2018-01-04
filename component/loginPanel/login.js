// component/loginPanel/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
    modalMsg: {
      type: String,
      value: ' ',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    text: "text",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 这里放置自定义方法
    modal_click_Hidden: function () {
      this.setData({
        modalHidden: true,
      })
    },
    // 确定
    Sure: function () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('onConfirm', "modal传递的数据")
      this.triggerEvent('sure', {key:"abcde", key2:"张留成"})
      console.log(this.data.text + " <====")
      this.setData({
        modalHidden: true
      })
    },

    showLogin: function() {
      this.setData({
        modalHidden: false
      })
    },

    hiddenLogin: function() {
      this.setData({
        modalHidden: true
      })
    }
  }
})
