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
}

module.exports = UserService