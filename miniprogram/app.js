//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'english-xetbx',
        traceUser: true,
      })
    }

    let capsuleInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.capsuleInfo = capsuleInfo
    wx.getStorage({
      key: 'history',
      success: (res) => {
          this.globalData.history = res.data
      },
      fail: (res) => {
          console.log("get storage failed")
          console.log(res)
          this.globalData.history = []
      }
    })
  },
  onHide: function () {
    // 在小程序使用录音功能时，后台播放的音乐关闭
    wx.stopBackgroundAudio()
  },
  // 权限询问
  getRecordAuth: function() {
    wx.getSetting({
      success(res) {
        console.log("setting launched")
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                // 如果用户拒绝小程序使用录音功能则需要用户自行在小程序设置中开启录音功能权限
                console.log("record authorized")
            }, fail() {
                console.log("fail auth")
            }
          })
        } else {
          console.log("record has been authorized")
        }
      }, fail(res) {
          console.log("setting failed")
          console.log(res)
      }
    })
  },
  globalData: {
    // 查询历史
    history: [],
  },
  // 引入`towxml3.0`解析方法
  towxml: require('/towxml/index'),
  //声明一个数据请求方法
  getText: (url, callback) => {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (typeof callback === 'function') {
          callback(res);
        };
      }
    });
  }
})


