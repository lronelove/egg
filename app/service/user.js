const Service = require('./../core/base_service.js')

class UserService extends Service {
  async list (page, count) {
    const start = (page - 1) * count // 开始的页数
    const sql = `SELECT * FROM USER LIMIT ${start}, ${count}`
    const data = await this.query(sql)
    let ajaxData = []

    for (let i = 0, len = data.length; i <len; i++) {
      let item = data[i]
      ajaxData.push({
        username: item.username,
        realName: item.realname,
        userId: item.user_id,
        email: item.email,
        avatar: item.avatar_image,
        permission: item.permission.trim() === 'user' ? '普通用户': '管理员',
        jobName: item.job_name
      })
    }
   
    return ajaxData
  }

  async index () {
  }

  // 登录
  async login (username, password) { // 登陆
    let data = await this.get('user', {
      username: username
    })

    if (!data) { // 查询不到用户
      return {
        msg: '用户不存在',
        login: false,
        data: ''
      }
    }

    let pwd = data.password

    if (pwd !== password) {
      return {
        msg: '密码错误！',
        login: false,
        data: ''
      }
    } else {
      return {
        msg: '登陆成功',
        login: true,
        data: data
      }
    }
  }

  // 获取tokenKey
  async getTokenKey () { // 获取编码token的秘钥
    const data = this.get('config', {
      id: 1
    })

    return JSON.stringify(data)
  }
}

module.exports = UserService