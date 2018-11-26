const xss = require('node-xss').clean // 预防xss攻击

module.exports = {
    // 把字符串转化成base64数据
    strToBase64 (str) {
        return new Buffer(str).toString('base64')
    },

    // 把base64数据转化成字符串
    base64ToStr (base64Str) {
      return new Buffer(base64Str, 'base64').toString()
    },

    // 把时间戳转换成2018-09-10的格式
    formatDate (timestamp) {
        let date = new Date(timestamp)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let str = `${year}-${month}-${day}`

        return str
    },

    // 把时间2018-10-24 17:26:30，转换成时间戳，精确到毫秒
    dateToTimestamp (str) {
        let date = new Date(str)
        let timestamp = date.getTime()

        return timestamp
    },

    // 防止xss攻击，在需要返回有可能放在html的字段的时候，必须用上
    safe (str) {
        return xss(str)
    }
}