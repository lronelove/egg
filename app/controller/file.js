const Controller = require('../core/base_controller.js')
// const fs = require('mz/fs')

class UploadController extends Controller {
    async index() {
      this.ctx.body = 'index'
      // const ctx = this.ctx
      // const file = ctx.request.files[0]
      // const name = 'egg-multipart-test/' + path.basename(file.filename)
      // let result

      // try {
      //   result = await ctx.oss.put(name, file.filename)
      // } finally {
      //   await fs.unlink(file.filepath)
      // }

      // this.success({
      //   url: result.url,
      //   requestBody: ctx.request.body
      // }, '上传成功！')
    }

    async test() {
      const ctx = this.ctx
      const oss = ctx.oss || 'not found'
      ctx.body = oss
    }
}

module.exports = UploadController