const Controller = require('egg').Controller
// const xss = require('node-xss').clean

class BaseController extends Controller {
  get user () {
    return this.ctx.session.user
  }

  // 成功时候的回调
  success (data, msg) {
    // let safeData = xss(data)
    this.ctx.body = {
      code: '0',
      // data: safeData,
      data,
      msg
    }
  }

  // 失败时候的回调
  fail (data, msg) {
    this.ctx.body = {
      code: '-1',
      data,
      msg
    }
  }

  notFound (msg) {
    msg = msg || 'not found'
    this.ctx.throw(404, msg)
  }
}

module.exports = BaseController