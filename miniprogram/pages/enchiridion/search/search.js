// var network = require("../../utils/network.js");
const app = getApp()

//云数据库初始化
const db = wx.cloud.database({});
// const cont = db.collection('weihai_award');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne: [],//加载全部的数据
    list: [],//历史记录
    inputValue: null,//输入的值
    resultList: [],
    ids:null,//用于返回用户的openid
    judge:[],//用于判断是否有重复的历史记录
    xianzhi:true,//控制显示几个历史记录
    title:[],//控制搜索跳转的参数变量
    shujuku:[],//控制具体哪个数据库
    shujukuzong:[],//初始加载的数据库名
    shujuku_length:[],//返回每个数据库的长度
    isLoading: true,
    showtitle:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let zhishu = e.zhishu//判断上个页面传递的数据是数组还是字符串
    if(zhishu == '0'){
      this.setData({ shujukuzong: this.data.shujukuzong.concat(e.shujuku) })
    }
    if(zhishu == '1'){
      var list = JSON.parse(e.shujuku)
      this.setData({shujukuzong : list})
      console.log("2")
    }
    var _this = this;
    //1、引用数据库   
    const db = wx.cloud.database({
      env: 'english-xetbx'
    })
    //云函数调用
    
      wx.cloud.callFunction({
        name: 'helloCloud',
        data: {
          message: 'helloCloud',
        }
      }).then(res => {
        _this.data.ids = res.result.OPENID;
        _this.shuaxin();//刷新历史记录
      });
      _this.diaoyong();
    setTimeout(function () {
      _this.setData({
        isLoading: false
      })
    }, 850)
  },

  //事件处理函数
  /**
   * 输入监听，并将输入值传入inputValue可以控制删除符号的显示
   */
  bindSearchInput: function (e) {
    this.inputValue = e.detail.value;//将输入的值赋给inputVaule
    this.data.inputValue = e.detail.value;
    this.setData(this.data);

    if (this.isNull(this.data.inputValue) == true) { 
      this.setData({resultList : []})
    }//搜索功能,如果搜索框清空则隐藏搜索栏
    else {this.search_databse();}
  },

  //当点击确定后执行的命令
  confirminput:function(e){
    if (this.isNull(this.data.inputValue) != true){
      this.findhistory(this.data.inputValue);//历史记录
    }
  },

  isNull:function(str){
    if (str == "") return true;
    if (str == null) {return true}
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  },

  

  //搜索数据库的调用
  diaoyong:function(e){
    for (let i = 0; i < this.data.shujukuzong.length; i++) {
      let shujukus = this.data.shujukuzong[i];
      wx.cloud.callFunction({
        name: 'diaoyong',
        data: {
          shujuku : shujukus,
          openid: 'opITs4oU4Jyqn3uzSKVCzj4f8HwI'
        },
      complete: res => {
          this.setData({
              ne: this.data.ne.concat(res.result.data),
              shujuku_length: this.data.shujuku_length.concat(res.result.data.length)
          })
        }
      })
    }
  },
 
  
  //搜索栏高光
  search_databse: function () {
    let weizhi = false//控制显示位置
    let hilight_word = function (key, word,weizhi) {
      let idx = word.indexOf(key);
      let t = [];
      if (idx > -1) {
        if (idx == 0) {
          weizhi = true;
          t = hilight_word(key, word.substring(key.length), weizhi);
          t.unshift({ key: true, str: key });
          return t;
        }
        if (idx > 0) {
          if (weizhi == false) {
            weizhi = true;
            t = hilight_word(key, word.substring(idx), weizhi);
            weizhi = false
            if (idx - 40 < 0) { t.unshift({ key: false, str: word.substring(0, idx) });}
            if (idx - 40 >= 0) { t.unshift({ key: false, str: word.substring(idx - 40, idx) });}
            
          }
          if(weizhi == true){
            t = hilight_word(key, word.substring(idx), weizhi);
            t.unshift({ key: false, str: word.substring(0, idx) });
          }
          return t;
        }
      }
      return [{ key: false, str: word }];
    };
    this.setData({
      shujuku : [],
      title : []
    })
    let searched = [];
    let inputs = this.data.inputValue;
    let j =0;

    for (let i = 0; i < this.data.ne.length; i++) {
      var current_word = JSON.stringify(this.data.ne[i].search);
      if (current_word.indexOf(inputs) > -1) {
        j = j + 1;
        weizhi = false;
        searched.push(hilight_word(inputs, current_word, weizhi));
        // console.log(searched)
        this.setData({ 
          title: this.data.title.concat(this.data.ne[i]._id),
          shujuku: this.data.shujuku.concat(this.data.ne[i].shujuku),
          showtitle:this.data.showtitle.concat(this.data.ne[i].title1)
          });
      }
      if(j>40){break;}
    }

    this.data.resultList = searched;
    // console.log(this.data.resultList)
    this.setData(this.data);
    // console.log(this.data.showtitle)
  },

  //刷新搜索历史的显示
  shuaxin: function (e) {
    //调用数据库
    wx.cloud.callFunction({
      name: 'diaoyong',
      data: {
        shujuku: "history",
        openid: this.data.ids
      },
      complete: res => {
        this.setData({
          list: res.result.data
        })
      }
    })
    //调用历史记录数据库
    // db.collection('history').where({
    //   _openid: this.data.ids,
    // }).get({
    //   success: res => {
    //     this.setData({
    //       list: res.data
    //     })
    //   }
    // })
  },

  // 判断该使用者是否录入此历史记录
  findhistory:function(key){
    var _this = this;
    wx.cloud.callFunction({
      name: 'lishiadd',
      data: {
        lishi: key,
        openid: _this.data.ids
      },
      complete: res => {
        console.log(key)
        let tasks = res.result
        console.log(tasks)
        if (tasks == undefined) {
          db.collection('history').add({
            data: {
              lishi: key
            },
            success: res => {
              _this.shuaxin();
            }//刷新搜索历史的显示
          })
        }
      }
    })
    // db.collection('history').where({
    //   _openid: this.data.ids,
    //   lishi: key			//判断该使用者是否录入此历史记录
    // }).get({
    //   success: res => {
    //     _this.setData({ judge: res.data });//避免历史记录重复
    //     // console.log(_this.data.judge.length)
    //     if (_this.data.judge.length == 0) {
    //       db.collection('history').add({
    //         data: {
    //           lishi: key
    //         },
    //         success: res => {
    //           this.shuaxin();
    //         }//刷新搜索历史的显示
    //       })
    //       }
    //   }
    // })
  },

  // 删除历史记录该用户的数据库
  remove: function () {
    var _this = this;
    let idss = this.data.ids;
    let biaoshi = [];
    wx.showModal({
      title: '提示',
      content: '确认清空所有记录?',
      success(res) {
        if (res.confirm) {
          // db.collection('history').where({_openid:idss}).get({
          //   success: res => {
          //     for (var index in res.data) {
          //       biaoshi.push(res.data[index]._id)
          //     } 
          //     for (var index in biaoshi) {
          //       db.collection('history').doc(biaoshi[index]).remove()
          //     }
          //       _this.setData({list:[]})    
          //   },
          // })
          wx.cloud.callFunction({
            name: 'diaoyong',
            data: {
              shujuku: "history",
              openid: _this.data.ids
            },
            complete: res => {
              let tasks = res.result.data
              _this.setData({ list: [] })
              for (var index in tasks) {
                db.collection('history').doc(tasks[index]._id).remove()
              }
              // console.log(tasks)
            }
          })
        }
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //点击历史记录框对输入框的控制
  bindhistory:function(e){
    // 获取点击选项卡的下标
    var id = e.currentTarget.dataset.id;
    this.setData({inputValue:this.data.list[this.data.list.length-id-1].lishi})
    // console.log(id);
    // console.log(this.data.inputValue);
    this.search_databse();
  },

  clean: function () {
    var _this = this
    setTimeout(function () {
      _this.setData({
        inputValue: '',
        resultList: []
      })
    }, 100)
  },
  xianzhis:function(e){
    this.setData({
      xianzhi:!this.data.xianzhi
    })
    // console.log(this.data.xianzhi)
  },
  // 跳转到 详情页面
  navi2detail: function (e) {
    wx.hideKeyboard();
    var index = e.currentTarget.dataset.name;
    this.findhistory(this.data.inputValue);
    // console.log(index)
    // console.log(this.data.title[index])
    var title = this.data.title[index];
    var shujuku = this.data.shujuku[index];
    // console.log(shujuku)
    wx.navigateTo({
      url: '/pages/enchiridion/detail/home/home?title=' + title + '&shujuku=' + shujuku
    })
  },

  
  
})