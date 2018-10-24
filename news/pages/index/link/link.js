Page({
  data: {
    linkUrl: ""
  },
  onLoad: function () {
    this.setData({
      linkUrl: getApp().linkUrl
    })
  }
})