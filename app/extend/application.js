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

let validate = new Validate()
validate.register('isTel', isTel) // 注册电话验证

module.exports = {
    validate (name, value) {
        return validate.executeCommand(name, value)
    }
}