module.exports = app => {
  const { router, controller } = app;
  router.get('/category/home', controller.category.home); // home首页分类接口
}