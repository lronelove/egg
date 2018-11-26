const Controller = require('egg').Controller

class BaseController extends Controller {
  // 成功时候的回调
  success(data, msg) {
    this.ctx.body = {
      code: 0,
      data: data,
      msg
    }
  }

  // 失败时候的回调
  fail(data, msg) {
      this.ctx.body = {
      code: -1,
      data: data,
      msg
    }
  }

  // 404
  notFound(msg) {
    msg = msg || 'not found'
    this.ctx.throw(404, msg)
  }
}

module.exports = BaseController