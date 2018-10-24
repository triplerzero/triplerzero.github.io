var page=1;
var datatype = [{ "type": "最新笑话" }, { "type": "随机笑话" }];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jokeData: [],
    currentTapIndex:0,
    datatype:datatype,
    floorstatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page=1;
    this.setData({
      jokeData: []
    })
    this.getData();
  },
  getData: function () {
    var that = this;
    wx.request({
      url: 'https://v.juhe.cn/joke/content/text.php?key=217d0dccc66a2901d8845d433a258e57&page='+page+'&pagesize=20',
      success: function (res) {
        var l = res.data.result.data;
        for (var i = 0; i < l.length;i++){
          l[i].content=l[i].content.replace(/&nbsp;/g, " ")
        };
        that.setData({
          jokeData: that.data.jokeData.concat(l)
        })
      }
    })
  },
  getRanData: function () {
    var that = this;
    wx.request({
      url: 'https://v.juhe.cn/joke/randJoke.php?key=217d0dccc66a2901d8845d433a258e57',
      success: function (res) {
        var l = res.data.result;
        for (var i = 0; i < l.length; i++) {
          l[i].content = l[i].content.replace(/&nbsp;/g, " ")
        };
        that.setData({
          jokeData: that.data.jokeData.concat(l)
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.currentTapIndex==0){
      page++;
      this.getData(); 
    }
    if (this.data.currentTapIndex == 1) {
      this.getRanData();
    }
  },
  tabTap:function(e){
    this.setData({
      jokeData:[],
      currentTapIndex:e.target.dataset.index
    })
    if (this.data.currentTapIndex == 0){
      this.getData();
    };
    if (this.data.currentTapIndex ==1){
      this.getRanData();
    }
  },
  //获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: true
      })
    } else {
      this.setData({
        floorstatus: false
      })
    }
  },
  totop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用用该功能，请升级到最新微信版本后重试'
      })
    }
  }

})