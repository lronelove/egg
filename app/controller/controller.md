作者：lronelove (王喆)
联系方式： QQ(657828543)
#controller的基本使用方法

## 第一步，引入基础controller
例子：const Controller = require('../core/base_controller.js')

## 第二步，继承基础controller,命名大写，驼峰命名
例子： 
class HomeController extends Controller { 
}

## 第三步，写controller里面的方法，可以参考post.js，看如何接收参数
class HomeController extends Controller { 
  async index () {

  }
}

## 第四步，写相应的业务逻辑，返回给前端的数据
如果成功调用，this.success(data, msg)方法，code为0代表成功，code为-1代表失败；
data是传输的数据，msg是提示信息；相反，如果调用失败，那么调用this.fail(data, msg)；
如果需要和数据库进行交互，那么在app/service文件夹下面新建类似user.js的js文件，
编写和数据库有关的操作，具体操作可以参考app/service/user.js,以及egg文档。

## 第五步，在app/router文件夹下面新建类似user.js的路由文件，配置相应路由
例子：app/router/user.js
需要注意的事项：
如果有在app/router文件夹下面新建js文件，那么一定要在app/router.js添加配置：
例子：
 require('./router/post')(app); 
 满足：require(url)(app) : url是相对于app/router.js文件的路径
