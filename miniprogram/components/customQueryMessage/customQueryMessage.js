
Component({
  properties: {
    msg: Object,
    recording: Boolean, // 语音输入时是否显示动图
    safe: Boolean, // 是否通过文本安全检查
  },

  data: { 
    safe: true, 
    showActionsheet: false,
    groups: [
      { text: '复制文本', value: 1 },
      { text: '播放语音', value: 2 }
  ]
  },
  lifetimes: {
    ready: function () {
      this.setData({ safe: true})
      if(this.properties.msg != null && this.properties.msg != undefined){
        // this.setData({ msg: this.properties.msg.content})
        let msg = this.properties.msg.content
        console.log("query msg: ",this.properties.msg)
        // this.doMsgSecCheck(msg)
      }
    }
  },
  methods: {
    // 文本敏感内容审核
    doMsgSecCheck: function (text) {
      let that = this
      console.log("doMsgSecCheck enabled")
      wx.serviceMarket.invokeService({
        service: 'wxee446d7507c68b11',
        api: 'msgSecCheck',
        data: {
          "Action": "TextApproval",
          "Text": text
        },
      }).then(res => {
        console.log(res.data.Response.EvilTokens)
        let EvilTokens = res.data.Response.EvilTokens
        // 由于海贝分手册不收集用户隐私信息，因此无法识别发送违规文本的用户身份
        if(EvilTokens.length > 0){ // 检测到违规文本
          wx.showToast({
            title: '检测到违规文本！',
            icon: 'none',
            duration: 2000
          })
        }else{
          that.setData({safe: true})
        }
      })
    },
    showModal: function(){
      // let that = this
      // let content = this.properties.msg.content
      // wx.showToast({
      //   title: '问题已复制到剪贴板啦~',
      // })
      this.setData({
        showActionsheet: true
      })
    },
    close: function () {
      this.setData({
          showActionsheet: false
      })
    },
    setClip: function(text) {
      wx.setClipboardData({
        data: text,
        success:  (res) => {
          wx.showToast({
            title: "复制成功！",
            icon: "success",
            duration: 1000,
            success: function (res) {
              console.log("show succ");
            },
            fail: function (res) {
              console.log(res);
            }
          });
        }
      })
    },
    btnClick(e) {
        console.log(e.detail.value)
        if(e.detail.value == 1){
          let content = this.properties.msg.content

          this.setClip(content)
        }
        if(e.detail.value == 2){
          const plugin = requirePlugin("WechatSI")
          var innerAudioContext = wx.createInnerAudioContext()
          innerAudioContext.autoplay = true
          let content = this.properties.msg.content

          plugin.textToSpeech({
            lang: 'zh_CN',
            tts: true,
            content: content,
            success: res=>{
              console.log("语音合成成功" + JSON.stringify(res))
              innerAudioContext.src = res.filename
              innerAudioContext.onPlay(()=>{
                console.log('开始播放！')
              })
            },
            fail: res=>{
              console.log("语音合成失败")
              wx.showToast({
                title: '语音合成失败',
                icon: 'error'
              })
            }
          })
        }
        this.close()
    }
  }
});
