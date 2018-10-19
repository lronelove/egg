作者：lronelove(王喆)
联系方式：QQ(657828543)

# 路由

1.新建一个类似home.js的路由文件，建议可以归类在一起的路由写在一个js文件下面，
例如，跟用户相关的路由，统一放在user.js下面

2.在app/router.js里面添加 require(routerFilePath)(app);
   routerFilePath: 新建的路由文件，例如app/router/user.js的相对于app/router.js的路径
   例子：参考app/router.js

3.定义一个具体路由：
 router.[method](apiUrl, controller.controllerFileName.function);

 method: 定义是get还是post请求
 controllerFileName: app/controller下面对应的js文件名
 function：这个js文件名下面类的具体方法

