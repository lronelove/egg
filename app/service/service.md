作者：lronelove(王喆)
联系方式：QQ(657828543)

# service
## 作用
主要用户和controller以及数据库进行交互

## 编写service方式：
参考： app/service/user.js
数据库交互：不推荐使用sql语句，egg文档里面有具体的增、删、改、查方法，例子：
 const user = await this.app.mysql.get('user', { // 在user表中查询username = 'lronelove' 的数据
      username: 'lronelove'
 })

## 使用service
参考：app/controller/user.js
例子： let user = await ctx.service.user.find() || []    // 调用app/service/user.js里面类的find方法 

