作者：lronelove(王喆)
联系方式：QQ(657828543)


# 核心基础controller
这是目前初步封装的基础controller,所有的controller继承于此基础controller,
这样的话可以保证返回的数据的结构以及code码的一致性

## success(data, msg)方法
成功的时候返回给前端数据的方法，
data：传输的数据
code: 0  和我们平时的接口返回的code码保持一致
msg: 提示信息

## fail(data, msg)方法
失败的时候返回给前端的数据的方法，
data: 传递的数据
code: -1 和我们平时的接口返回的code码保持一致
msg: 提示信息

## notFound 404时候返回的数据

## 如何调用？
在继承了base_controller.js之后，直接使用this.success(data, msg),
参考例子： app/controller/post.js