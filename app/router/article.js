module.exports = app => {
  const {router , controller, config} = app;
  const version = config.apiVersion;

  router.post(version + '/article/reply/post', controller.article.postReply); // 提交文章评论
  router.post(version + '/article/reply/get', controller.article.getReply); // 获取文章评论
  router.post(version + '/article/reply/delete', controller.article.deleteReply); // 册除评论getReplyInfo
  router.get(version + '/article/reply/getAll', controller.article.getAdminAllReply); // 获取文章评论
  router.get(version + '/article/reply/info', controller.article.getReplyInfo); // 获取文章评论
  router.post(version + '/article/getArticleList', controller.article.getArticleList); // 获取文章列表
  router.post(version + '/article/addArticle', controller.article.addArticle); // 新增文章
  router.post(version + '/article/deleteArticle', controller.article.deleteArticle); // 删除文章
  router.post(version + '/article/editArticle', controller.article.editArticle); // 删除文章
  router.post(version + '/article/getArticle', controller.article.getArticle); // 查询单篇文章
  router.post(version + '/article/addArticleVisitor', controller.article.addArticleVisitor); // 增加文章浏览量
  router.post(version + '/article/reply/likeIt', controller.article.like); // 文章评论点赞
  router.post(version + '/article/reply/unlikeIt', controller.article.unlike); // 文章评论取消点赞
}