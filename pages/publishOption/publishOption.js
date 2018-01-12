// pages/publishOption/publishOption.js
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

  //  created: function () {
  //   console.log("created")
  // },

  // attached: function () {
  //   console.log("attached")
  // },

  // ready: function () {
  //   console.log("ready")
  // },

  // moved: function () {
  //   console.log("moved")
  // },
  // detached: function () {
  //   console.log("detached")
  // },

  /**
   * 组件的初始数据
   */
  data: {
    anim: false,
    animClose: {},
    animOption1: {},
    animOption2: {},
    animOption3: {},
    animOption4: {},
    animOption5: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal: function () {
      if (this.anim) {
        return;
      }
      this.anim = true;
      setTimeout(function () {
        this.anim = false;
      }.bind(this), 1020)
      this.setData({
        modalHidden: false
      })
      this.showCloseAnim();
      this.showOptionAnim();
    },

    hiddenModal: function () {
      if (this.anim) {
        return;
      }
      this.anim = true;
      setTimeout(function () {
        this.anim = false;
        this.setData({
          modalHidden: true
        })
      }.bind(this), 1020)
      this.hideCloseAnim();
      this.hideOptionAnim();
    },

    // 显示X按钮的动画
    showCloseAnim: function () {
      setTimeout(function () {
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        animation.scale(1.6, 1.6).rotate(45).step()
        this.setData({
          animClose: animation.export()
        })
      }.bind(this), 100)
    },

    // 隐藏X按钮的动画
    hideCloseAnim: function () {
      setTimeout(function () {
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        animation.scale(1, 1).rotate(0).step()
        this.setData({
          animClose: animation.export()
        })
      }.bind(this), 100)
    },

    // 显示分类动画
    showOptionAnim: function () {
      var that = this;
      this.showOptionAnimReal(function (anim) {
        that.setData({
          animOption1: anim
        })
      }, 100);
      this.showOptionAnimReal(function (anim) {
        that.setData({
          animOption2: anim
        })
      }, 200);
      this.showOptionAnimReal(function (anim) {
        that.setData({
          animOption3: anim
        })
      }, 300);
      this.showOptionAnimReal(function (anim) {
        that.setData({
          animOption4: anim
        })
      }, 400);
      this.showOptionAnimReal(function (anim) {
        that.setData({
          animOption5: anim
        })
      }, 500);
    },

    // 隐藏分类动画
    hideOptionAnim: function () {
      var that = this;
      this.hideOptionAnimReal(function(anim){
        that.setData({
          animOption1: anim
        })
      }, 500);
      this.hideOptionAnimReal(function (anim) {
        that.setData({
          animOption2: anim
        })
      }, 400);
      this.hideOptionAnimReal(function (anim) {
        that.setData({
          animOption3: anim
        })
      }, 300);
      this.hideOptionAnimReal(function (anim) {
        that.setData({
          animOption4: anim
        })
      }, 200);
      this.hideOptionAnimReal(function (anim) {
        that.setData({
          animOption5: anim
        })
      }, 100);
    },

    showOptionAnimReal: function (callback, delay) {
      setTimeout(function () {
        var animation = wx.createAnimation({
          duration: 1,
          timingFunction: 'step-start',
        })
        animation.translateY(200).opacity(0).step()
        animation.translateY(0).opacity(1).step({ timingFunction: 'ease', duration: 500 })
        callback(animation.export())
      }.bind(this), delay)
    },

    hideOptionAnimReal: function (callback, delay) {
      setTimeout(function () {
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        animation.translateY(200).opacity(0.01).step()
        animation.translateY(0).step({ timingFunction: 'step-start', duration: 10 })
        callback(animation.export())
      }.bind(this), delay)
    }
  }
})
