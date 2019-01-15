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
    /**
     * 
     * timestamp时间
     * type,回调的时间类型
     */
    formatDate (timestamp, type = 'yyyy-mm-dd') {
        let date = new Date(timestamp)
        let year = date.getFullYear()
        let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        let hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
        let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
        let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
        let str = ''
        switch (type) {
            case 'yyyy-mm-dd': str = `${year}-${month}-${day}`
                break;
            case 'yyyy-mm-dd hh:mm:ss':
                str = `${year}-${month}-${day} ${hours}:${minute}:${second}`
                break;
            case 'yyyy-mm-dd hh:mm':
                str = `${year}-${month}-${day} ${hours}:${minute}`
                break; 
            case 'hh:mm':
                str = `${hours}:${minute}`
                break;
            case 'hh:mm:ss':
                str = `${hours}:${minute}:${second}`
                break;
        }

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
    },

    // 距离到现在的时间， 1年前，1个月前，1周前，1天前，1小时前，1分钟前，刚刚
    // createTime的格式  2018-12-13T08:14:25.000Z,即数据库目前自动存储时间的格式
    timeFromNow (createTime) {
        const createDate = new Date(createTime)
        const create = generateTime(createDate)
        const nowDate = new Date()
        const now = generateTime(nowDate)
        const diff = {
            year: now.year - create.year + Math.floor(( now.month - create.month ) / 12),
            month: now.month - create.month + Math.floor(( now.day - create.day ) / 30),
            day: now.day - create.day + Math.floor(( now.hour - create.hour ) / 24),
            hour: now.hour - create.hour + Math.floor(( now.minute - create.minute ) / 60),
            minute: now.minute - create.minute + Math.floor(( now.second - create.second ) / 60),
            second: now.second - create.second
        }

        return getResult(diff) // 返回的数据

        // 获取一个Date对象的年月日等信息
        function generateTime(Date) {
            return {
                year: Date.getFullYear(),
                month: Date.getMonth() + 1,
                day: Date.getDate(),
                hour: Date.getHours(),
                minute: Date.getMinutes(),
                second: Date.getSeconds()
            }
        }

        // 获取结果
        function getResult(diff) {
            // 大于一年
            if ( diff.year ) {
                return `${ diff.year }年前`
            }

            // 小于一年，大于一个月
            if ( diff.month ) {
                return `${ diff.month }月前`
            }

            // 小于一个月,大于一周
            if ( diff.day > 7 ) {
                return `${ Math.floor(diff.day / 7) }周前`
            }

            // 小于一周，大于一天
            if ( diff.day ) {
                return `${ diff.day }天前`
            }

            // 小于一天，大于一个小时
            if ( diff.hour ) {
                return `${ diff.hour }小时前`
            }

            // 小于一小时，大于一分钟
            if ( diff.minute ) {
                return `${ diff.minute }分钟前`
            }

            // 小于一分钟
            if ( diff.second ) {
                return `刚刚`
            }
        }
    },

    // 0: 不是数字或不是数字字符串
    // 1: 小数
    // 2: 负数
    // 3: 正整数
    isInteger (num) {
        if (Number(num) && Number(num) !== 0) {
            if (Number.isInteger(Number(num))) {
                if (Number(num) >= 0) {
                    return 3
                } else {
                    return 2
                }
            } else {
                return 1
            }
        } else {
            return 0
        }
    }
}