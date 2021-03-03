// miniprogram/pages/enchiridion/detail/detail.js
const db = wx.cloud.database({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowSideslip: false,
    title:'',//用于检索是哪篇文章
    textList: [],
    shujuku:'',
    content:'',
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let _this = this
    this.setData({
      title:e.title,
      shujuku:e.shujuku,
    })
    setTimeout(function () {
      wx.cloud.callFunction({
        name: 'detail',
        data: {
          shujuku: _this.data.shujuku,
          id: _this.data.title
        },
        complete: res => {
          _this.setData({
            textList: res.result.data,
            isLoading: false
          })
        }
      })
    }, 500)
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

  }
})