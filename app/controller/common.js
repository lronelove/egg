/* 处理分类相关操作 */
const Controller = require('../core/base_controller.js')

class CommonController extends Controller {
  // 查询职位分类
  async queryJobTypes () {
    let data = await this.ctx.service.common.queryJobTypes()
    this.success(data)
  }

  // 判断是否是route权限
  async isRoot () {
  	const body = this.ctx.request.body
  	const userId = body.userId

  	let flag = await this.ctx.service.common.isRoot(userId)
  	this.success({ isRoot: flag })
  }
}

module.exports = CommonController