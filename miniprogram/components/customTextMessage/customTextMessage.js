

var plugin = requirePlugin("chatbot");
// 机器人回复组件
Component({
  properties: {
    msg: Object,
  },

  data: {
    showActionsheet: false,
    groups: [
      { text: '复制文本', value: 1 },
      { text: '播放语音', value: 2 }
  ]
  },
  lifetimes: {
    ready: function() {
      let that = this;
      let AvatarImage = "https://7465-testsduwh030201-icc8o-1301103668.tcb.qcloud.la/%E6%B5%B7%E8%B4%9D%E5%88%86/robotAvatar.png?sign=b43fa918e2ce12f5db8deb7148cfdb16&t=1613869820"
      this.setData({AvatarImage: AvatarImage})
      console.log('text msg: ' + JSON.stringify(this.properties.msg))
      console.log(this.properties.msg)
      // console.log('currentTarget: ' + this.properties.currentTarget)
      const facejson = {
        qqface: [
          "微笑",
          "撇嘴",
          "色",
          "发呆",
          "得意",
          "流泪",
          "害羞",
          "闭嘴",
          "睡",
          "大哭",
          "尴尬",
          "发怒",
          "调皮",
          "呲牙",
          "惊讶",
          "难过",
          "酷",
          "冷汗",
          "抓狂",
          "吐",
          "偷笑",
          "愉快",
          "白眼",
          "傲慢",
          "饥饿",
          "困",
          "惊恐",
          "流汗",
          "憨笑",
          "悠闲",
          "奋斗",
          "咒骂",
          "疑问",
          "嘘",
          "晕",
          "疯了",
          "衰",
          "骷髅",
          "敲打",
          "再见",
          "擦汗",
          "抠鼻",
          "鼓掌",
          "糗大了",
          "坏笑",
          "左哼哼",
          "右哼哼",
          "哈欠",
          "鄙视",
          "委屈",
          "快哭了",
          "阴险",
          "亲亲",
          "吓",
          "可怜",
          "菜刀",
          "西瓜",
          "啤酒",
          "篮球",
          "乒乓",
          "咖啡",
          "饭",
          "猪头",
          "玫瑰",
          "凋谢",
          "嘴唇",
          "爱心",
          "心碎",
          "蛋糕",
          "闪电",
          "炸弹",
          "刀",
          "足球",
          "瓢虫",
          "便便",
          "月亮",
          "太阳",
          "礼物",
          "拥抱",
          "强",
          "弱",
          "握手",
          "胜利",
          "抱拳",
          "勾引",
          "拳头",
          "差劲",
          "爱你",
          "NO",
          "OK",
          "爱情",
          "飞吻",
          "跳跳",
          "发抖",
          "怄火",
          "转圈",
          "磕头",
          "回头",
          "跳绳",
          "投降",
          "激动",
          "乱舞",
          "献吻",
          "左太极",
          "右太极"
        ]
      };

      const clicklink = /<a.*href=["']weixin:\/\/bizmsgmenu.*msgmenucontent=([^&"'>]*).*msgmenuid=([^&"'>]*)["']>.*<\/a>/g;
      let content = this.properties.msg.content;

      if (/\[([^\]]*)\]/.test(content)) {
        content = content.replace(/\[([^\]]*)\]/g, (txt, match) => {
          const index = facejson.qqface.indexOf(match);
          if (index > -1) {
            return (
              '<span class="ai-qqemoji" style="background-position: ' +
              that.getFacePosition(index) +
              '">' +
              match +
              "</span>"
            );
          }
          return txt;
        });
      }
      // 超链接逻辑处理
      let linkArr = [],i = 0;
      if(/<a.*href=["']http(s)?:\/\/.*["']>.*<\/a>/g.test(content)){
        content = content.replace(/(<a.*?href=["'](https?[^"']*).*?>([^<]*?)<\/a>)/g, (txt, match1, match2, match3) => {
          linkArr.push({
            name: match3,
            href: match2
          })
          return `<a>${match3}</a>`
        })
        this.setData({
          linkArr: linkArr
        })
      }
      if (/<a.*>|<span.*>/.test(content)) {
        this.setData({
          isRich: true,
          answer: content
        });
      }
    }
  },
  methods: {
    choose: function(e) {
      const chat = plugin.getChatComponent();
      chat.send(e.currentTarget.dataset.title);
    },
    getFacePosition(index) {
      const row = 15;
      const width = 24;
      const height = 24;
      const y = Math.floor(index / row);
      const x = index - y * row;
      return -(x * width) + "px " + -(y * height) + "px";
    },
    tap: function (e) {
      let url = e.currentTarget.dataset.weburl
      wx.navigateTo({
        url: `/pages/webviewPage/webviewPage?url=${url}`
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
