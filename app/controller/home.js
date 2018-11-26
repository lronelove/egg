/* 处理分类相关操作 */
const Controller = require('../core/base_controller.js')

class HomeController extends Controller {
  // 首页导航数据
  async nav () {
    const data = await this.ctx.service.home.nav();
    this.success(data)
  }

  // 首页推荐模块 
  async recommend () {
    const data = await this.ctx.service.home.recommend()
    this.success(data)
  }
}

module.exports = HomeController