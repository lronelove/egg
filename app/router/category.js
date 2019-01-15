module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;
  
  router.get(version + '/category/home', controller.category.home); // home首页分类接口
  router.post(version + '/category/getCategory', controller.category.getCategory) // 文章分类
  router.post(version + '/category/addCategory', controller.category.addCategory) // 新增文章分类
  router.post(version + '/category/editCategory', controller.category.editCategory) // 编辑文章分类
  router.post(version + '/category/deleteCategory', controller.category.deleteCategory) // 删除文章分类
}