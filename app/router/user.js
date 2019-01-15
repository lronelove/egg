module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;
  
  router.post(version + '/user/queryLimitedInfo', app.middlewares.checklogin(), controller.user.queryLimitedInfo); // 获取用户部分信息的接口  
  router.post(version + '/login', controller.user.login); // 登录的接口 
  router.post(version + '/logout', controller.user.logout); // 登出的接口
  router.get(version + '/user', app.middlewares.checklogin(), controller.user.index); // 如果检测登录成功，那么可以访问，'/user'接口
  router.post(version + '/user/list', app.middlewares.checklogin(), controller.user.list), // 后台管理用户列表的接口
  router.post(version + '/user/delete', app.middlewares.checklogin(), controller.user.delete) // 删除某个用户
  router.post(version + '/user/add', app.middlewares.checklogin(), controller.user.add) // 添加用户
  router.post(version + '/user/detail', app.middlewares.checklogin(), controller.user.detail) // 用户资料详情
  router.post(version + '/user/edit', app.middlewares.checklogin(), controller.user.edit) // 修改用户资料
  router.post(version + '/user/editPassWord', app.middlewares.checklogin(), controller.user.editPassWord) // 修改用户密码
  router.get(version + '/user/totalInfo', controller.user.totalInfo) // 获取统计信息
}