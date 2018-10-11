const Service = require('egg').Service;

class UserService extends Service {
  async find () {
    const sql = 'select * from user'
    const user = await this.app.mysql.query(sql)
    
    return user;
  }

  async login (username, password) {
    const sql = `select * from user where username = ? and password = ?`
    const data = await this.app.mysql.query(sql, [username, password])

    return data
  }

  async get () {
    // 需要更改的参数
    const row = {
      tel: 1234
    }
    
    // 查询的条件
    const options = {
      where: {
        username: 'lronelove'
      }
    }
    // 更改tel
    const result = await this.app.mysql.update('user', row, options)

    // 查询更改之后的结果
    const user = await this.app.mysql.get('user', {
      username: 'lronelove'
    })

    return { user, result }
  }
}

module.exports = UserService