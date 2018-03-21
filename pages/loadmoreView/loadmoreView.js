// pages/loadmoreView/loadmoreView.js

Component({
  properties: {
   
  },

  data: {
    modalHidden: false,
    loadingHidden: true,
    emptyHidden: true,
    errorHidden: true,
  },

  methods: {

    hideInfoView: function () {
      this.setData({
        modalHidden: true
      })
    },

    showLoadingView: function () {
      this.setData({
        modalHidden: false,
        loadingHidden: false,
        emptyHidden: true,
        errorHidden: true
      })
    },

    showEmptyView: function () {
      this.setData({
        modalHidden: false,
        loadingHidden: true,
        emptyHidden: false,
        errorHidden: true
      })
    },

    showErrorView: function () {
      this.setData({
        modalHidden: false,
        loadingHidden: true,
        emptyHidden: true,
        errorHidden: false
      })
    },

    loadmore: function () {
      this.triggerEvent("loadmore")
    }
  }
})
