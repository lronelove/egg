'use strict';
/* 用户相关操作 */
const Controller = require('../core/base_controller.js')
const jwt = require('jsonwebtoken') // 生成token的插件

class UserController extends Controller {
  // 新增用户
  async add () {
    const body = this.ctx.request.body
    const userId = parseInt(body.userId) || ''
    const username = body.username || ''
    const password = body.password || ''
    const telephone = body.telephone || ''
    const realname = body.realname || ''
    const avatar_image = body.avatarImage || ''
    const email = body.email || ''
    const job_name = body.jobName || ''
    const job_type = body.jobType || ''
    const permission = body.permission || 'user'
    let create_time = this.ctx.helper.formatDate(new Date(), 'yyyy-mm-dd hh:mm:ss')
    if (userId === '' || userId === null || userId === NaN) {
      this.fail('', 'userId不能为空')
    } else if (!username) {
      this.fail('', '用户名不能为空')
    } else if (!password) {
      this.fail('', '用户密码不能为空')
    } else {
      const res = await this.ctx.service.user.add(userId, username, password, telephone, realname, avatar_image, email, job_name, job_type, permission, create_time)
      this.success('', res) 
    }
  }
  // 用户资料详情
  async detail () {
    const body = this.ctx.request.body
    const id = body.id || ''
    // this.success(id)
    if (id === '' || id === null || id === NaN) {
      this.fail('', '用户id不能为空')
    } else {
      const res = await this.ctx.service.user.detail(parseInt(id))
      if (res instanceof Object) {
        this.success(res, '查询成功')  
      } else {
        this.success('', res)
      }
    }
  }
  // 编辑用户资料
  async edit () {
    const body = this.ctx.request.body
    const userId = parseInt(body.userId) || ''
    const id = parseInt(body.id) || ''
    const username = body.username || ''
    // const password = body.password || ''
    const telephone = body.telephone || ''
    const realname = body.realname || ''
    const avatar_image = body.avatarImage || ''
    const email = body.email || ''
    const job_name = body.jobName || ''
    const job_type = body.jobType || ''
    const update_time = this.ctx.helper.formatDate(new Date(), 'yyyy-mm-dd hh:mm:ss')
    if (userId === '' || userId === null || userId === NaN) {
      this.fail('', 'userId不能为空')
    } else if (!id || id === null || id === NaN) {
      this.fail('', 'id不能为空')
    } else if (!username) {
      this.fail('', '用户名不能为空')
    } else {
      const res = await this.ctx.service.user.edit(userId, id, username, telephone, realname, update_time, avatar_image, email, job_name, job_type)
      this.success('', res) 
    }
  }

  // 修改用户密码
  async editPassWord () {
    const body = this.ctx.request.body
    const userId = parseInt(body.userId) || ''
    const id = parseInt(body.id) || ''
    const password = body.password || ''
    if (userId === '' || userId === null || userId === NaN) {
      this.fail('', 'userId不能为空')
    } else if (!id || id === null || id === NaN) {
      this.fail('', 'id不能为空')
    } else if (!password) {
      this.fail('', '用户密码不能为空')
    } else {
      const res = await this.ctx.service.user.edit(userId, id, password)
      this.success('', res) 
    }
  }

  async delete () {
    const body = this.ctx.request.body
    const userId = parseInt(body.userId)
    const id = parseInt(body.id)
    const res = await this.ctx.service.user.deleteUser(userId, id)
    this.success('', res)
  }

  // 前台根据用户id获取部分信息的接口
  async queryLimitedInfo () {
    const body = this.ctx.request.body
    const userId = parseInt(body.userId)
    const data = await this.ctx.service.user.getUserById(userId)
    const res = data[0]

    let ajaxData = {
      avatarImage: res.avatar_image
    }
    this.success(ajaxData)
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
      this.success({ token, userId: loginInfo.data.user_id }, loginInfo.msg)
    }
  }

  // 退出登录,清除token
  async logout () {
    const ctx = this.ctx
    this.ctx.cookies.set('token', null, {
      maxAge: 0
    })
    this.success('', '退出登录成功！')
  }

  /**
   * @description 获取统计信息
   * @author utaware
   * @date 2018-12-26
   * @returns 
   */

  async totalInfo () {

    const { ctx, app } = this

    try {
      // 相关查询
      const total_classify = await app.mysql.query("SELECT * FROM statistics;")
      const user_classify = await app.mysql.query("SELECT job_type, job_name, COUNT(job_type) AS count FROM user WHERE status = '1' GROUP BY job_type;")
      const login_user = await app.mysql.query("SELECT realname,DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s') AS last_login FROM user WHERE status = '1' ORDER BY last_login DESC LIMIT 10;")
      const last_week = await app.mysql.query("SELECT  DATE_FORMAT(login_time,'%Y-%m-%d') days, count(*) as total FROM user WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(login_time) AND status = '1' GROUP BY days;")
      // 查询
      return ctx.end(true, { total_classify, user_classify, login_user, last_week })
    } catch (err) {
      return ctx.end(false, '信息获取失败', {err})
    }
  }
}

module.exports = UserController
