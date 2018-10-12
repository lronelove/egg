'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    // 返回request对象
    async index() {
        let str = 'HELLO1'
        let json = {
            "data": this.ctx.helper.toLowerCase(str),
            "code": 1,
            "msg": "success",
            // "config": this.config
        }
        this.ctx.body = json
    }

    // 测试cookie
    async add() {
        const ctx = this.ctx
        let count = ctx.cookies.get('count') // 文档有误
        let maxAge = 60 * 60 * 24 * 7 // 7天

        count = count ? Number(count): 0
        ctx.cookies.set('count', ++count, {
            maxAge: maxAge
        })
        ctx.body = count
    }

    // 删除cookie
    async remove() {
        const ctx = this.ctx
        const count = ctx.cookies.set('count', null)
        ctx.status = 204
    }

    // egg建议对cookie的value值进行base64编码或者其它形式encode之后再写入
    async base64Cookie() {
        const ctx = this.ctx
        let base64Count = ctx.cookies.get('count')
        let count = ctx.helper.base64ToStr(base64Count)
        let maxAge = 60 * 60 * 24 * 7

        count = count ? Number(count): 0
        count++
        base64Count = ctx.helper.strToBase64(count)
        ctx.cookies.set('count', base64Count, {
            maxAge
        })
    }
}

module.exports = HomeController
