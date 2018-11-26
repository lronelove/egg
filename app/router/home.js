module.exports = app => {
  const { router, controller } = app;
  router.get('/home/nav', controller.home.nav); // home首页导航接口 
  router.get('/home/recommend', controller.home.recommend); // home首页导航接口 
}