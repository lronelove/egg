'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const ctx = this.ctx
    let user = await ctx.service.user.find() || []
    let data = {
      msg: '获取成功',
      data: user,
      code: 1
    }
    ctx.body = data
  }

  async login() {
    const ctx = this.ctx
    const body = ctx.request.body // 里面包含传过来的参数
    let username = body.username
    let password = body.password
    let loginInfo = await ctx.service.user.login(username, password) || ''
    let msg, code, data

    if (loginInfo.length === 0 || !loginInfo) {
      msg = '用户不存在'
      code = 0
    } else {
      msg = '登陆成功'
      code = 1
      ctx.cookies.set('username', username)
    }
    
    data = {
      data: {
       username,
       password
      },
      msg,
      code
    }
    this.ctx.body = JSON.stringify(data)
  }

  async test() {
    let user = await this.ctx.service.user.get()
    this.ctx.body = user
  }
}

module.exports = UserController
