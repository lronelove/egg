'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let json = {
      "data": "hello",
      "code": 1,
      "msg": "success",
      "body": this.ctx.request
    }
    this.ctx.body = json;
  }

  async add () {
    const ctx = this.ctx 
    let count = ctx.cookies.get('count') // 文档有误
    count = count ? Number(count): 0
    ctx.cookies.set('count', ++count) 
    ctx.body = count
  }

  async remove () {
    const ctx = this.ctx
    const count = ctx.cookies.set('count', null)
    ctx.status = 204
  }
}

module.exports = HomeController;
