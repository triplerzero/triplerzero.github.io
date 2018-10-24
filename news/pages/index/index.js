var datatype=[
"头条","社会","国内","国际","娱乐","体育","军事","科技","财经","时尚"
]
var titlename=[
  "top","shehui","guonei","guoji","yule","tiyu","junshi","keji","caijing","shishang"
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsData:[],
    newsType:"top",
    datatype:datatype,
    currentTapIndex:0,
    floorstatus:false
  },
onLoad:function(){
  this.setData({
    newsData: []
  })
this.getData();
},
    newsTap: function (e) {
    getApp().linkUrl = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: "./link/link"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
getData:function() {
    var that=this;
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?type='+this.data.newsType+'&key=d6307ea8bf7caf622ee7c67295e83732',
      success:function(res){
        var list = res.data.result.data;
        for(var i=0;i<list.length;i++){
          list[i].url = list[i].url.replace(/http/g,"https");
          console.log(list[i].url)
        };
        that.setData({
        newsData:list
       })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  tabTap:function(e){
    this.setData({
      newsData:[],
      currentTapIndex:e.target.dataset.index,
      newsType:titlename[e.target.dataset.index]
    })
    this.getData();
    },
    //获取滚动条当前位置
    onPageScroll:function(e){
      if(e.scrollTop>200){
        this.setData({
          floorstatus:true
        })
      }else{
        this.setData({
          floorstatus:false
        })
      }
    },
    totop:function(e){
      if(wx.pageScrollTo){
        wx.pageScrollTo({
          scrollTop: 0
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用用该功能，请升级到最新微信版本后重试'
        })
      }
    }

})
