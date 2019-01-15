'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/user')(app);
  require('./router/job')(app);
  require('./router/category')(app);
  require('./router/home')(app);
  require('./router/share')(app);
  require('./router/article')(app);
  require('./router/common')(app);
  require('./router/file')(app);
  require('./router/recommend')(app);
  require('./router/link')(app);
};
