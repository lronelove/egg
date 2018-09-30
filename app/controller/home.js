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
}

module.exports = HomeController;
