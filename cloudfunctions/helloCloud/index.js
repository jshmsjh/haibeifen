// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// helloCloud-index.js 云函数入口函数
exports.main = async (event, context) => {
  let { APPID, OPENID } = cloud.getWXContext()
  return {
    APPID,
    OPENID
  }
}

  
