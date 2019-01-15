const Controller = require('egg').Controller

class BaseController extends Controller {
  // 成功时候的回调，data是数据，msg是信息
  success(data, msg) {
    this.ctx.body = {
      code: 0,
      data: data,
      msg
    }
  }

  // 失败时候的回调，data是数据，msg是信息
  fail(data, msg) {
      this.ctx.body = {
      code: -1,
      data: data,
      msg
    }
  }

  // 统一的返回函数
  // data是数据，msg是信息，code的返回的code码0代表成功-1代表失败，status代表状态码
  send (data = "", msg = "", code = 0, status) {
    if (status) {
      this.ctx.status = status
    }
    this.ctx.body = {
      data,
      msg,
      code
    }
  }

  // 404
  notFound(msg) {
    msg = msg || 'not found'
    this.ctx.throw(404, msg)
  }
}

module.exports = BaseController