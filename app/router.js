'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/user')(app);
  require('./router/category')(app);
  require('./router/home')(app);
};
