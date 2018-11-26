/* 处理分类相关操作 */
const Controller = require('../core/base_controller.js')

class CategoryController extends Controller {
  async home () {
    const ctx = this.ctx
    let data = await this.ctx.service.category.home()
    console.log(data)
    this.ctx.body = data
  }
}

module.exports = CategoryController