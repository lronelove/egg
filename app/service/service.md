作者：lronelove(王喆)
联系方式：QQ(657828543)

<<<<<<< HEAD
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

=======
# service的使用

## service的作用
service主要是用来和数据库进行交互，并处理一些相关的业务逻辑的部分

## 使用方式
1. 一般一个controller文件，比如app/controller/user.js，对应一个service文件，例如app/service/user.js。
2. 引入并且继承封装好的app/core/base_service.js（封装了一些关于数据库的操作）
3. 可以看一下app/core/base_service.js，一些数据库方法的封装，调用的时候直接使用this.funcName(), 例如,this.query()  
>>>>>>> lronelove
