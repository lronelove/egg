const Controller = require('../core/base_controller.js')

class PostController extends Controller {
  async index () {
    const { ctx } = this
    ctx.body = ctx
  }

  // 用来测试base_controller
  async create () {
    const { ctx, service } = this
    const data = {
      name: 'jack',
      age: 23
    }
    ctx.validate({
      title: {
        type: 'string'
      },
      content: {
        type: 'string'
      }
    })
    this.success(data, '获取数据成功！')
    // this.fail('', '获取数据失败')
    // this.notFound('找不到页面')
  }

  // query的传值
  async query () {
    const { ctx } = this
    const query = ctx.query
    const { username, tel } = query
    // const str = `your username is ${username} and your telephone is ${tel}`
    const str = username
    this.success(str, '注册成功！')
    // ctx.body = query
  }

  // params参数传值
  async params () {
    const ctx = this.ctx
    ctx.body = ctx.params
  }

  // 测试session
  async fetchPosts () {
    const ctx = this.ctx
    const userId = ctx.session.userId
    if (!userId) {
      ctx.session.userId = 'no one'
    }
    ctx.session.visited = ctx.session.visited ?  ++ctx.session.visited : 1
    ctx.body = {
      success: true,
      visited: ctx.session.visited,
      userId: userId
    }
  }
}

module.exports = PostController