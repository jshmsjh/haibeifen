var app = getApp(); //获取当前小程序的实例，方便使用全局方法和属性
const db = wx.cloud.database({
  env: 'english-xetbx'
})
Page({

  /**
   * 页面的初始数据
   */
  data: { //设置页面数据，后面空值将在页面显示时通过请求服务器获取
    shujuku: ['xinyonghuimin_geren', 'xinyonghuimin_jiti', 'xinyonghuimin_faren', 'liangbanfa_shequ', 'liangbanfa_nongcun', 'zhengce_wendeng', 'zhengce_zhongyang', 'zhengce_weihai', 'wujin_shequ', 'wujin_nongcun', 'wujin_jiguan', 'wujin_qiye', 'wujin_xuexiao'],
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
    tpList: [{
        id: 1,
      "img_url": "http://m.qpic.cn/psc?/V53eNTYt1pd9JR0Gs26D2BgrN92nV3Uu/ruAMsa53pVQWN7FLK88i5skTtCdpnfdE72Rq4SODXvhit9FLdZfMTh*dUaupM7gdanpM7o*9gjKkgXEYhJuXyJdKralNKMy1gG8AbYPi1H0!/mnull&bo=.wB3APsAdwADCSw!&rf=photolist&t=5"
      },
      {
        id: 2,
        "img_url": "http://m.qpic.cn/psc?/V53eNTYt1pd9JR0Gs26D2BgrN92nV3Uu/ruAMsa53pVQWN7FLK88i5skTtCdpnfdE72Rq4SODXvg9sewAHkjTS1HdXX9LghP*Wnom0njixz*hKo9ZAnMsPVg8J8qn5dnAjojZVJy70qE!/mnull&bo=.wB3APsAdwADCSw!&rf=photolist&t=5"
      },
      {
        id: 3,
        "img_url": "http://m.qpic.cn/psc?/V53eNTYt1pd9JR0Gs26D2BgrN92nV3Uu/ruAMsa53pVQWN7FLK88i5skTtCdpnfdE72Rq4SODXvj4V*Tcqwh2FnFSvHUVPKbNmwv20RVvTYyT7w15GpfXdKbfY.X*bzkEDSLdBMe*xnI!/mnull&bo=.wB3APsAdwABCS4!&rf=photolist&t=5"
      },
      {
        id: 4,
        "img_url": "http://m.qpic.cn/psc?/V53eNTYt1pd9JR0Gs26D2BgrN92nV3Uu/ruAMsa53pVQWN7FLK88i5kTd4o0k6y4NaEBWiJAZJWTUPVpOoOB3v.kyDt5RtEP7aFwz*p.vZ6O3AXKXbLoVPpAY6hJ2QaRsaLLt1twcsEM!/mnull&bo=.wB3APsAdwADCSw!&rf=photolist&t=5"
      },
      {
        id: 5,
        "img_url": "http://m.qpic.cn/psc?/V53eNTYt1pd9JR0Gs26D2BgrN92nV3Uu/ruAMsa53pVQWN7FLK88i5kTd4o0k6y4NaEBWiJAZJWQGfYlBc6JlVAjPYzsna7kHXd1OqEcShp9634gNmg5dIGL*EEMz1Jl*yBQ1o90nDwY!/mnull&bo=.wB3APsAdwADCSw!&rf=photolist&t=5"
      }
    ],
    titleList: [],
    lunbo:[],
    ids:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    
    wx.cloud.callFunction({
      name: 'helloCloud',
      data: {
        message: 'helloCloud',
      }
    }).then(res => {
        _this.data.ids = res.result.OPENID;
        // console.log(this.data.ids)
        wx.cloud.callFunction({
          name: 'state',
          data: {
            openid: _this.data.ids
          }
        }).then(res => {
            console.log(res.result.data)
            if(res.result.data == false){
              db.collection('state').add({
                data:{
                  
                }
              })
              wx.showModal({
                cancelColor: 'cancelColor',
                title: '是否需要查看使用方法？',
                success: res=>{
                  if(res.confirm){
                    console.log('用户点击确定')
                    let id = 'b00064a7603cf5bb07d39b1c44770f18'
                    wx.navigateTo({
                      url: '../markdown/home/home?id=' + id,
                    })
                  }else if(res.cancel){
                    console.log('用户点击取消')
                  }
                }
              })
            }
        });
    });
    
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

    const db = wx.cloud.database({
      env: 'english-xetbx'
    })

    let shujukus = this.data.shujuku;
    wx.cloud.callFunction({
      name: 'markdown',
      data: {
        from: '政策必读'
      },
      complete: res => {
        this.setData({
          textList: res.result.data
        })
      }
    }),
    wx.cloud.callFunction({
      name: 'markdown',
      data: {
        from: '轮播图'
      },
      complete: res => {
        this.setData({
          lunbo: res.result.data
        })
      }
    })
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

  // 跳转到搜索页面
  search: function() {
    let zhishu = '1';
    var model = JSON.stringify(this.data.shujuku);
    wx.navigateTo({
      url: '../search/search?zhishu=' + zhishu + '&shujuku=' + model
    })
  },
  //跳转到 markdown界面
  navi2detail: function (e) {
    var index = e.currentTarget.dataset.index;
    // console.log(this.data.textList[index]._id)
    let id = this.data.textList[index]._id
    wx.navigateTo({
      url: '../markdown/home/home?id=' + id,
    })
  },
  //跳转到 markdown轮播界面
  navi2lunbo: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    // console.log(this.data.lunbo[index]._id)
    let id = this.data.lunbo[index]._id;
    console.log(id);
    wx.navigateTo({
      url: '../markdown/home/home?id=' + id,
    })
  },
  //跳转到政策法规
  navi2policy: function() {
    wx.navigateTo({
      url: '../policy/home/home',
    })
  },
  //跳转到信用惠民
  navi2benefit: function() {
    wx.navigateTo({
      url: '../benefit/home/home',
    })
  },
  //跳转到五进政策
  navi2wujin: function() {
    wx.navigateTo({
      url: '../wujin/home/home',
    })
  },
  //跳转到两办法
  navi2liangbanfa: function() {
    wx.navigateTo({
      url: '../liangbanfa/home/home',
    })
  },
})