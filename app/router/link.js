module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;
  
  router.resources('link', version +'/link', controller.link)
}