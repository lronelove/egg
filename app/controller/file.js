const Controller = require('../core/base_controller.js')

class FileController extends Controller {
    // 上传图片的接口
    async uploadImage() {
        const ctx = this.ctx
        const stream = await ctx.getFileStream() // 获取文件流

        const res = await ctx.service.file.uploadImage(stream) // 获取返回的结果

        if ( res.success ) {
            this.success(res.url, res.msg)
        } else {
            this.fail(res.url, res.msg)
        }
    }
}

module.exports = FileController