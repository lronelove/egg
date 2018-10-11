module.exports = app => {
  const { router, controller } = app;
  router.get('/user', controller.user.index);
  router.post('/login', controller.user.login);
  router.get('/user/test', controller.user.test);
}