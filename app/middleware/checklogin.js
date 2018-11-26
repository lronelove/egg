module.exports = () => {
    const jwt = require('jsonwebtoken')

    return async function (ctx, next) {
        if (ctx.request.header['authorization']) {
            let token = ctx.request.header['authorization'].split(' ')[1]
            let decoded
            let tokenKey = ctx.service.user.getTokenKey() || 'nothing'

            //解码token
            try {
                decoded = jwt.verify(token, tokenKey)
            } catch (error) {
                const ctx = this.ctx
                const body = ctx.request.body // 里面包含传过来的参数
                let username = body.username
                let password = body.password
                let loginInfo = await ctx.service.user.login(username, password) || ''

                if (error.name == 'TokenExpiredError') {
                    //重新发放令牌
                    token = jwt.sign({
                        userId: loginInfo.id,
                        username: loginInfo.username
                    }, tokenKey, {
                        expiresIn: '7 days' //过期时间设置为7天。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
                    });
                    ctx.cookies.set('token', token, {
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        httpOnly: false,
                        overwrite: true,
                        signed: false
                    });
                } else {
                    ctx.status = 401;
                    ctx.body = {
                        message: 'token失效'
                    }
                    return;
                }
            }
            //重置cookie时间
            ctx.cookies.set('token', token, {
                maxAge: 60 * 1000,
                httpOnly: false,
                overwrite: true,
                signed: false
            })
            await next()
        } else {
            ctx.status = 401
            ctx.body = {
                message: '没有token'
            }
            return;
        }
    }
};
