'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538206202148_6891';

  // add your config here
  config.middleware = [];

  // 处理跨域的插件
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false,
    },
    domainWhiteList: ['localhost', '*']
  };
  
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.bodyParser = {
    jsonLimit: '10mb',
  }

  return config;
};


