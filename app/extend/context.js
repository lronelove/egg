/*
 * @Description: ctx上下文扩展
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2018-12-26 10:20:37
 * @LastEditors: utaware
 * @LastEditTime: 2019-01-02 17:07:00
 */

const utils = require('./lib/utils')

module.exports = {
  // log
  log: utils.log,
  // 合并响应参数  
  mergeRes: utils.mergeRes,
  // 响应的方法
  end (...args) {
    // 调用hepler utils方法
    let { status, body } = utils.mergeRes(...args)
    // 返回结果
    this.status = status
    this.body = body
    return 
  },
  // 筛选的方法
  filterData: utils.filterData,
  groupFilter: utils.groupFilter
}