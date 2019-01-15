module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;
  
  router.get(version + '/home/nav', controller.home.nav); // home首页导航接口 
  router.get(version + '/home/recommend', controller.home.recommend); // home首页导航接口 
}