//logs.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
var plugin = requirePlugin("chatbot"); 
Page({
  data: {

  },
  onLoad: function (options) {
    plugin.init({
      appid: "Bo7ke5SCj9urGSEJ3dWLSev7PbkGr2",
      openid: "wx19b4351902169a6d",
      textToSpeech: 2,
      guideList: ["海贝分是什么","海贝分有什么用","文登有哪些信用惠民政策"],
      welcome: '有什么问题都可以问小贝哦~',
      background: "#eee",
      guideCardHeight: 50,
      operateCardHeight: 60,
      history: false,
      // historySize: 60,
      navHeight: 0,
      hideMovableButton: true,
      // username: true,
      robotHeader: 'https://7465-testsduwh030201-icc8o-1301103668.tcb.qcloud.la/%E6%B5%B7%E8%B4%9D%E5%88%86/robotAvatar.png?sign=1ec0ab5abcb4df3aa3c88566c36fd81e&t=1613876462',
      success: () => {
        this.setData({
          flag: true //chatbot插件初始化成功
        })
      },
      fail: error => {
        console.log("chatbot init failed")
      }
    });
  },
  getQueryCallback: function(e){
    console.log('queryCallback: ' + JSON.stringify(e.detail))
  }
})
