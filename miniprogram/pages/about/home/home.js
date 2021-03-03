// miniprogram/haibei pages/about and feedback/about and feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // //跳转到 总体介绍
  // navi2introduction: function() {
  //   wx.navigateTo({
  //     url: '../introduction/introduction',
  //   })
  // },
  //跳转到 markdown界面
  navi2introduction: function (e) {
    // console.log(this.data.textList[index]._id)
    let id = "79550af2603cd86b07c1631e76dc009f"
    wx.navigateTo({
      url: '../../enchiridion/markdown/home/home?id=' + id,
    })
  },
  //跳转到 政策日志
  navi2timeline: function() {
    wx.navigateTo({
      url: '../timeline/timeline',
    })
  },
  //跳转到 意见反馈
  navi2feedback: function() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  navi2kefu: function() {
    wx.navigateTo({
      url: '../../service/home/home',
      fail: err=>{
        console.log(err)
      }
    })
  },
  navi2use: function(){
    let id = 'b00064a7603cf5bb07d39b1c44770f18'
    wx.navigateTo({
      url: '../../enchiridion/markdown/home/home?id=' + id,
    })
  }
})