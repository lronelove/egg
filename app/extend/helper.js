module.exports = {
    // 变成小写
    toLowerCase(str) {
        return str.toLowerCase()
    },

    // 把字符串转化成base64数据
    strToBase64(str) {
        return new Buffer(str).toString('base64')
    },

    // 把base64数据转化成字符串
    base64ToStr(base64Str) {
      return new Buffer(base64Str, 'base64').toString()
    }
}