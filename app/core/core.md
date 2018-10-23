作者：lronelove(王喆)
联系方式：QQ(657828543)


# 核心基础controller
这是目前初步封装的基础controller,所有的controller继承于此基础controller,
这样的话可以保证返回的数据的结构以及code码的一致性

# 核心基础service
因为egg-mysql里面的增、删、改、查操作比较长(例如：this.app.mysql.get())，
而且在增、删、改的时候判断是否操作成功比较繁琐，所以封装了一下数据库的相关操作。具体参照base_service.js.
封装之后，如果需要删除数据，那么直接调用this.delete()方法，而且返回值的true或者false，可以用来判断时候操作成功

