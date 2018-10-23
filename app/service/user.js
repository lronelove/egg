// const Service = require('egg').Service;
const Service = require('./../core/base_service')

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
      tel: 12345
    }
    
    // 查询的条件
    const options = {
      where: {
        username: 'lronelove'
      }
    }
    // 更改tel
    // const result = await this.app.mysql.update('user', row, options)
    const result = await this.update('user', row, options)

    // 查询更改之后的结果

    // const user = await this.app.mysql.get('user', {
    //   username: 'lronelove'
    // })

    // 在user表里面插入一条数据
    const insertRes = await this.insert('user', {
      username: 'rose',
      password: 'rose',
      tel: '234'
    })

    // 插入一段数据判断成功与否
    let insertSuccessFlag = insertRes.affectedRows === 1

    const user = await this.get('user', {
      username: 'rose'
    })

    // 删除的返回结果
    const deleteRes = await this.delete('user', {
      username: 'rose'
    })

    // 判断删除是否成功
    let deleteSuccessFlag = deleteRes.affectedRows === 1
    console.log(user)

    return { user, result}
  }
}

module.exports = UserService