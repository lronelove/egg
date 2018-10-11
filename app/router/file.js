module.exports = app => {
  const { router, controller } = app;
  router.post('/file/index', controller.file.index);
  router.get('/file/test', controller.file.test);
}