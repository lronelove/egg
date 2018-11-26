module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.user.login); // 登录的接口
  router.get('/user', app.middlewares.checklogin(), controller.user.index); // 如果检测登录成功，那么可以访问，'/user'接口
  router.post('/user/list', controller.user.list) // 后台管理用户列表的接口
}