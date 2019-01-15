// 生产环境的配置

module.exports = appInfo => {
    const config = {};

    // 处理跨域的插件
    config.security = {
        csrf: {
        enable: false,
        ignoreJSON: false,
        },
        domainWhiteList: ['localhost', '']
    };

    // 数据库的配置
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: 'localhost',
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