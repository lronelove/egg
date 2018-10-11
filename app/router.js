'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  require('./router/file')(app);
  require('./router/home')(app);
  require('./router/user')(app);
  require('./router/post')(app);
  
  // router.get('/', controller.home.index);
  // router.get('/home/add', controller.home.add);

  // router.get('/user', controller.user.index);
  // router.post('/login', controller.user.login);

  // router.get('/post', controller.post.create);
  // router.get('/post/query', app.middlewares.uppercase(), controller.post.query);
  // router.get('/post/params/:userId/:password', controller.post.params);
  // router.get('/post/fetchPosts', controller.post.fetchPosts);
  
  // router.post('/file/index', controller.file.index);
  // router.get('/file/test', controller.file.test);
};
