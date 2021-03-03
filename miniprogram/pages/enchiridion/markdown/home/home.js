//获取应用实例
const app = getApp();
const db = wx.cloud.database({
  env: 'english-xetbx'
})
Page({
  data: {
    isLoading: true,
    article: {}
  },
  onLoad: function (option) {
    let _this = this
    // console.log(option.id)
    // setTimeout(function () {
      wx.cloud.callFunction({
        name: 'detail',
        data: {
          shujuku: "markdown",
          id: option.id
        },
        complete: res => {
          // console.log(res.result.data[0])
          app.getText(res.result.data[0].content, res1 => {
            let obj = app.towxml(res1.data, 'markdown', {
              events: {
                tap: e => {
                  console.log('tap', e);
                },
                change: e => {
                  console.log('todo', e);
                }
              }
            });
            _this.setData({
              article: obj,
              isLoading: false
            });
          });
        }
      })
    // }, 500)

    // let that = this
    // db.collection("markdown").where({
    //   _id: option.id
    //   // _openid:"opITs4oU4Jyqn3uzSKVCzj4f8HwI"
    // }).get({
    //   success: res => {
    //     app.getText(res.data[0].content, res1 => {
    //       let obj = app.towxml(res1.data, 'markdown', {
    //         events: {
    //           tap: e => {
    //             console.log('tap', e);
    //           },
    //           change: e => {
    //             console.log('todo', e);
    //           }
    //         }
    //       });
    //       that.setData({
    //         article: obj,
    //         isLoading: false
    //       });
    //     });
    //   }
    // })
  }
})