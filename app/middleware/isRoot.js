// 判断用户是否有root权限的中间件
module.exports = () => {
    const jwt = require('jsonwebtoken')

    return async function (ctx, next) {
        if (ctx.request.header['authorization']) {
            let token = ctx.request.header['authorization'].split(' ')[1]
            let decoded
            let tokenKey = await ctx.service.user.getTokenKey() || 'nothing'

            decoded = jwt.verify(token, tokenKey) // 解码token
            console.log(decoded.userId)
            userId = decoded.userId
            console.log('userId:' + userId)
            let isRoot = await ctx.service.common.isRoot(userId) // 判断是否有用户权限

            if ( !isRoot ) {
                ctx.stattus = 401
                ctx.body = {
                    code: -2,
                    data: ''
                }
                return
            } else {
                await next()
            }
        } else {
            ctx.status = 401
            ctx.body = {
                code: -2,
                data: '',
                msg: '没有token'
            }
            return
        }
    }
};
