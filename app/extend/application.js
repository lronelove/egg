class Validate {
    constructor () {
        this.commands = {} // 包含所有的正则验证的集合
    }

    // 添加一个正则验证的命令
    register (name, func) {
        this.commands[name] = func
    }

    // 调用验证类的一个验证
    executeCommand (name, value) {
        let func = this.commands[name]
        
        if (func) return func(value)
    }
}

// 电话号码的验证
const isTel = (value) => {
    let pat = /^1[34578]\d{9}$/

    if (!pat.test(value)) {
        return {
            msg: '手机格式不正确',
            flag: false
        }
    } else {
        return {
            msg: '手机格式验证成功',
            flag: true
        }
    }
}

// 是否满足 2018-12-12 10:10:10的时间格式
const isDate = (time) => {
    let pat = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/

    if (!pat.test(time)) {
        return {
            msg: '时间格式不正确',
            flag: false
        }
    } else {
        return {
            msg: '时间格式验证成功',
            flag: true
        }
    }
}

// 过去头尾空格
const trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

let validate = new Validate()
validate.register('isTel', isTel) // 注册电话验证
validate.register('trim', trim) // 去除首尾空格
validate.register('isDate', isDate) // 注册日期验证

module.exports = {
    validate (name, value) {
        return validate.executeCommand(name, value)
    }
}