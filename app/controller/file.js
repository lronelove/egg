const Controller = require('../core/base_controller.js')
const fs = require('fs') //node.js 文件操作对象
const path = require('path') //node.js 路径操作对象
const awaitWriteStream = require('await-stream-ready').write //故名思意 异步二进制 写入流
const sendToWormhole = require('stream-wormhole') //管道读入一个虫洞。
const md5 = require('md5')

// const fs = require('mz/fs')

class UploadController extends Controller {
    async index() {
        const ctx = this.ctx
        const stream = await ctx.getFileStream()

        //新建一个文件名
        const filename = md5(stream.filename) + path
            .extname(stream.filename)
            .toLocaleLowerCase()

        //文件生成绝对路径
        //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
        const target = path.join(this.config.baseDir, 'app/public/uploads', filename)

        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target)

        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }

        // 文件响应
        ctx.body = {
            url: '/public/uploads/' + filename
        }

    }

    async test() {
      const ctx = this.ctx
      const oss = ctx.oss || 'not found'
      ctx.body = oss
    }
}

module.exports = UploadController