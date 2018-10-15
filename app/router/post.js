module.exports = app => {
  const { router, controller } = app;
  router.get('/post', controller.post.create);
  // router.get('/post/query', app.middlewares.uppercase(), controller.post.query);
  router.get('/post/query', controller.post.query);
  router.get('/post/params/:userId/:password', controller.post.params);
  router.get('/post/fetchPosts', controller.post.fetchPosts);
}