作者：lronelove(王喆)
联系方式：QQ(657828543)

# service的使用

## service的作用
service主要是用来和数据库进行交互，并处理一些相关的业务逻辑的部分

## 使用方式
1. 一般一个controller文件，比如app/controller/user.js，对应一个service文件，例如app/service/user.js。
2. 引入并且继承封装好的app/core/base_service.js（封装了一些关于数据库的操作）
3. 可以看一下app/core/base_service.js，一些数据库方法的封装，调用的时候直接使用this.funcName(), 例如,this.query()  
