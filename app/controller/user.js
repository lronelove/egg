'use strict';
/* 用户相关操作 */
const Controller = require('../core/base_controller.js')
const jwt = require('jsonwebtoken') // 生成token的插件

class UserController extends Controller {
  async delete () {  
  }

  // 后台获取用户列表接口
  async list () {
    const body = this.ctx.request.body
    const count = body.count || 10 // 一次多少条数据
    const page = body.page || 1 // 页数
    const data = await this.ctx.service.user.list(page, count)
    this.success(data)
  }

  // 测试权限
  async index () {
    let userData = await this.ctx.service.user.index()
    this.ctx.body = userData
  }

  // 登陆
  async login () {
    const ctx = this.ctx
    const body = ctx.request.body // 里面包含传过来的参数
    let username = body.username
    let password = body.password
    let loginInfo = await ctx.service.user.login(username, password) || '' // 查询数据库，获取登录信息
    let tokenKey = await ctx.service.user.getTokenKey() || 'nothing' // 在数据库中获取tokenKey

    if (!loginInfo.login) {
      this.fail('', loginInfo.msg) // 登录失败
    } else { // 登录成功，并生成token
      let token = jwt.sign({
          userId: loginInfo.id,
          username: loginInfo.username
      }, tokenKey, {
        expiresIn: '7 days'
      })
      this.ctx.cookies.set('token', token, { // 存储token
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false,
        overwrite: true,
        signed: false
      })
      this.success(token, loginInfo.msg)
    }
  }

  // 退出登录,清除token
  async logout () {
    const ctx = this.ctx
    this.ctx.cookies.set('token', null, {
      maxAge: 0
    })
  }
}

module.exports = UserController
