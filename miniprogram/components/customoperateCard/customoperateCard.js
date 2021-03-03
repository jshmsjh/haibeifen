var plugin = requirePlugin("chatbot");

// 底部输入组件
Component({
  properties: {
    focus: Boolean, // 焦点
    inputText: String, //  输入的内容
    inputing: Boolean, // 根据是否正在输入切换显示状态
    height: Number // 组件高度
  },

  data: {
    inputing: false, //值为true时表示正在输入
    inputText: '',
    EvilTypes:{
      1: "政治",
      2: "色情",
      3: "辱骂/低俗",
      4: "暴恐/毒品",
      5: "广告/灌水",
      6: "迷信/邪教",
      7: "其他违法",
      8: "综合",
      9: "联系方式/链接",
    }
  },

  lifetimes: {
    ready: function() {
      if (this.properties.focus) {
        this.setData({
          focus: this.properties.focus,
          inputing: true
        })
      }
    },
    attached:function () {
    }
  },

  methods: {

    // 文字输入
    bindInput: function(e) {
      this.setData({
        inputText: e.detail.value
      });
    },
    // 输入选择
    chooseType: function(e) {
      if (e.currentTarget.dataset.type == "voice") {
        this.setData({
          inputing: false
        });
      } else {
        this.setData({
          inputing: true
        });
      }
    },

    // 确认输入内容
    bindconfirmInput: function(e) {
      var that = this;
      let text = e.detail.value;
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      that.doMsgSecCheck(text)
      that.setData({
        inputText: ''
      })
    },

  // 文本敏感内容审核
  doMsgSecCheck: function (text) {
    const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
    console.log("doMsgSecCheck enabled")
    wx.serviceMarket.invokeService({
      service: 'wxee446d7507c68b11',
      api: 'msgSecCheck',
      data: {
        "Action": "TextApproval",
        "Text": text
      },
    }).then(res => {
      let that = this
      console.log(res.data.Response.EvilTokens)
      let EvilTokens = res.data.Response.EvilTokens
      // 由于海贝分手册不收集用户隐私信息，因此无法识别发送违规文本的用户身份
      if(EvilTokens.length > 0){ // 检测到违规文本
        console.log('检测到 ' + that.data.EvilTypes[EvilTokens[0].EvilType] + ' 信息')
        console.log('违规文本：' + EvilTokens[0].EvilKeywords)
        wx.showToast({
          title: '检测到违规文本！',
          icon: 'none',
          duration: 2000
        })
      }else{
        chat.send(text) // 向chatbot插件发送查询请求
      }
    })
   },

    // 启动语音
    inputVoiceStart: function() {
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      chat.inputVoiceStart() // chatbot语音开始
    },
    // 停止语音
    inputVoiceEnd: function() {
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      chat.inputVoiceEnd() // chatbot语音结束
    },
  }
});
