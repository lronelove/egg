// 把query里面的username变成大写的一些中间件
module.exports = () => {
  return async function (ctx, next) {
    ctx.query.username = ctx.query.username && ctx.query.username.toUpperCase()
    await next()
  }
}