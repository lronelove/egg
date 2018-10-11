'use strict';

// had enabled by egg
// exports.static = true;
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// mysql
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// 验证
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

