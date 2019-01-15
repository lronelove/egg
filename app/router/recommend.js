module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;
  
  router.resources('recommend', version +'/recommend', controller.recommend)
}