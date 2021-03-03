//云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database({
    env: 'english-xetbx'
  })
// 云函数入口函数
const MAX_LIMIT = 100
exports.main = async (event, context) => {

  // 先取出集合记录总数
  const countResult = await db.collection("state").where({ _openid:event.openid }).count()
  let res = true
  if(countResult.total == 0){
      res = false;
  }
  // 等待所有
  return{
      data: res
  }
}
