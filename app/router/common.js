module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;
  
  router.get(version + '/common/queryJobTypes', controller.common.queryJobTypes); // 查询工作角色分类
  router.post(version + '/common/isRoot', app.middlewares.checklogin(), controller.common.isRoot); // 查询工作角色分类
}