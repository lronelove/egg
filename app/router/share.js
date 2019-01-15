module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;

  router.get(version + '/share', controller.share.index); 
  router.post(version + '/share/add', controller.share.add); 
  router.post(version + '/share/delete', controller.share.delete); 
  router.post(version + '/share/update', controller.share.update); 
  router.get(version + '/share/getById', controller.share.getById); 
}