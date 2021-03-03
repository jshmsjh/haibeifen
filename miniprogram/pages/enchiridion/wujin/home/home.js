var app = getApp(); //获取当前小程序的实例，方便使用全局方法和属性

Page({

  /**
   * 页面的初始数据
   */
  data: { //设置页面数据，后面空值将在页面显示时通过请求服务器获取
    shujuku: ['wujin_shequ', 'wujin_nongcun', 'wujin_jiguan', 'wujin_qiye', 'wujin_xuexiao'],
    indicatorDots: true, //是否显示面板指示点
    indicatorColor: "#CCE6FF", //指示点颜色
    indicatorActiveColor: "#0081ff", //当前选中的指示点颜色
    autoplay: true, //是否自动切换，默认false
    circular: true, // 是否采用衔接滑动，默认false
    interval: 5000, // 自动切换时间间隔
    duration: 500, //滑动动画时长
    previousMargin: "0px", //前边距
    nextMargin: "0px", // 后边距
    current: 0, // 当前所在滑块的index
    isLoading: true,
    tpList: [{
        id: 1,
        "img_url": "http://science.china.com.cn/images/2019-04/04/40e76dc2-955b-4876-82eb-cb9c6911677f.png"
      },
      {
        id: 2,
        "img_url": "https://5b0988e595225.cdn.sohucs.com/images/20191221/9854f13d54f549d7af4df09181a48f03.jpeg"
      },
      {
        id: 3,
        "img_url": "https://www.1zj.com/uploadfile/2019/1220/20191220053059964.jpg"
      }
    ],
    textList1: [],
    textList2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log("options:--onLoad-----------------------")
    console.log(options)
    //转发跳转处理
    let tpage = options.tpage
    let data_key = options.data_key
    let data_value = options.data_value
    if (tpage) {
      wx.navigateTo({
        url: '/pages/' + options.tpage + '/' + options.tpage + '?' + data_key + "=" + data_value
      })
    }
    setTimeout(function () {
      let tmp1 = false
      let tmp2 = false
      wx.cloud.callFunction({
        name: 'markdown',
        data: {
          from: '五进政策必读'
        },
        complete: res => {
          // console.log('五进政策必读' + JSON.stringify(res.result.data)),
          that.setData({
            textList1: res.result.data
          })
          tmp1 = true
          if(tmp2 == true){
            that.setData({
              isLoading: false
            })
          }
        }
      })
      wx.cloud.callFunction({
        name: 'markdown',
        data: {
          from: '五进大家关注'
        },
        complete: res => {
          // console.log('五进大家关注' + JSON.stringify(res.result.data)),
          that.setData({
            textList2: res.result.data
          })
          tmp2 = true
          if(tmp1 == true){
            that.setData({
              isLoading: false
            })
          }
        }
      })
    }, 500)
  },

  //切换图片滑动
  swiperChange(e) {
    console.log(e)
    let current = e.detail.current
    this.setData({
      current: current
    })
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

  // 跳转到 搜索页面
  search: function() {
    let zhishu = '1';
    var model = JSON.stringify(this.data.shujuku);
    wx.navigateTo({
      url: '../../search/search?zhishu=' + zhishu + '&shujuku=' + model
    })
  },
  //跳转到 markdown界面
  navi1detail: function (e) {
    var index = e.currentTarget.dataset.index;
    // console.log(this.data.textList1[index]._id)
    let id = this.data.textList1[index]._id
    wx.navigateTo({
      url: '../../markdown/home/home?id=' + id,
    })
  },
  //跳转到 markdown界面
  navi2detail: function (e) {
    var index = e.currentTarget.dataset.index;
    // console.log(this.data.textList[index]._id)
    let id = this.data.textList2[index]._id
    wx.navigateTo({
      url: '../../markdown/home/home?id=' + id,
    })
  },
  
 
})