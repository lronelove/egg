作者：lronelove(王喆)
联系方式：QQ(657828543)

# 中间件
中间件的使用方式很多，例如app/middleware/uppercase.js，把username大写
在app/router/post.js 
例子：router.get('/post/query', app.middlewares.uppercase(), controller.post.query);