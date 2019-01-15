const fs = require('fs') //node.js 文件操作对象
const path = require('path') //node.js 路径操作对象
const awaitWriteStream = require('await-stream-ready').write //故名思意 异步二进制 写入流
const sendToWormhole = require('stream-wormhole') //管道读入一个虫洞。
const md5 = require('md5')

const Service = require('./../core/base_service.js')

class FileService extends Service {
    async uploadImage (stream) {
        //新建一个文件名
        const filename = md5(stream.filename) + path
            .extname(stream.filename)
            .toLocaleLowerCase()

        //文件生成绝对路径
        //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
        const target = path.join(this.config.baseDir, 'app/public/uploads', filename)

        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target)
        let flag = false // 是否上传成功

        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
            flag = true
        } catch ( err ) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            flag = false
            // throw err;
        }

        // 文件响应
        if ( flag ) { // 上传成功
            return {
                url: '/public/uploads/' + filename,
                success: flag,
                msg: '上传成功'
            }
        } else { // 上传失败
            return {
                url: '是吧',
                success: flag,
                msg: '上传失败'
            }
        }
    }
}

module.exports = FileService