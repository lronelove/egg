// 本地开发环境的配置

'use strict';

module.exports = appInfo => {
    const config = {};

    // 数据库的配置
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: '192.168.1.102',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: 'root',
            // 数据库名
            database: 'segi',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

    return config;
};


