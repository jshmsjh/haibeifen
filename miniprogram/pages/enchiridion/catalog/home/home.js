// miniprogram/pages/enchiridion/wujin/wujin.js

const db = wx.cloud.database({});
const app = getApp()

Page({
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    isLoading: true,


    isShowSideslip: false,
    textList: [],//用于调用题目和正文
    muluList:[],//用于显示点击完目录后的题目和正文
    shujuku:'',
    title1:[],//用于储存目录的标题一
    num:[],//用于记录title1的数量
    title2:[],
    show:[],
    showtitle : false//用于控制显示什么页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var _this = this;
    this.setData({shujuku: e.shujuku})
    const db = wx.cloud.database({
      env: 'english-xetbx'
    })

    let shujukus = this.data.shujuku;
    setTimeout(function () {
      wx.cloud.callFunction({
        name: 'diaoyong',
        data: {
          shujuku: shujukus,
          openid: 'opITs4oU4Jyqn3uzSKVCzj4f8HwI'
        },
        complete: res => {
          _this.setData({
            textList: res.result.data,
            isLoading: false
          })
          _this.quchong1();
        }
      })
    }, 500)
    
  },
  firstjump:function(e){
    let changdu = this.data.title1.length
    // console.log(changdu)
    var index = e.currentTarget.dataset.indexs;
    // console.log(index)
    
      let panduan = true;
      if (this.data.show[index] == true) { panduan = false }
      let chushi = [];
      for (let i = 0; i < this.data.title1.length; i++) {
        chushi.push(false)
      }
      this.quchong2(this.data.num[index], this.data.num[index + 1])
      chushi[index] = panduan
      this.setData({
        show: chushi,
      })
    
    //   this.setData({
    //     showtitle: false,
    //     modalName: null
    //   })
  },
  quanbu:function(){
      this.setData({
        showtitle: false,
        modalName: null
      })
  },
  secondjump:function(e){
    var index1 = e.currentTarget.dataset.index1;
    var index2 = e.currentTarget.dataset.index2;
    let titles1 = this.data.title1[index1];
    let titles2 = this.data.title2[index2];
    let shujukus = this.data.shujuku;
    wx.cloud.callFunction({
      name: 'mulu',
      data: {
        shujuku: shujukus,
        title1 : titles1,
        title2 : titles2
      },
      complete: res => {
        this.setData({
          muluList: res.result.data,
          showtitle: true,
          modalName: null
        })
      }
    })
  },
  
  //去重函数
  arrayUnique:function(arr) {
    var result = [],num=[], hash = {};
    // console.log(this.data.textList[227])
    for(var i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem]) {
        result.push(elem);
        hash[elem] = true;
        num.push(i);console.log(num)
      }
    }
    num.push(arr.length)
    // console.log(arr.length)
    return{
      result : result,
      num : num
      };
  },
  //对数据库中的数据的titel1和titel2去重
  quchong1:function(e){
    let title1begin = [];
    let searched = [];
    for(let i = 0;i < this.data.textList.length;i++){
      title1begin.push(this.data.textList[i].title1)
    }
    let{result,num} = this.arrayUnique(title1begin);
    for(let i = 0;i < result.length;i++){
      searched.push(false)
    }
    this.setData({
      title1 : result,
      num : num,
      show : searched,
    })
    console.log(this.data.num)
  },

  quchong2:function(num1,num2){
    let title2begin = [];
    for (let i = num1; i < num2; i++) {
      title2begin.push(this.data.textList[i].title2)
    }
    let { result, num } = this.arrayUnique(title2begin);
    this.setData({
      title2: result,
    })
  },
  
  show: function () {
    this.setData({
      isShowSideslip: true
    })
  },

  offSideslipMen: function () {
    this.setData({
      isShowSideslip: false
    })
  },

  // 跳转到 搜索页面
  search: function() {
    let zhishu = '0';
    wx.navigateTo({
      url: '../../search/search?zhishu=' + zhishu + '&shujuku=' + this.data.shujuku
    })
  },
  // 跳转到 详情页面
  navi2detail: function(e) {
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../../detail/home/home?title=' + name + '&shujuku=' + this.data.shujuku
    })
  },
})