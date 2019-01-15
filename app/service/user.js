const Service = require('./../core/base_service.js')

class UserService extends Service {
  async add (userId, username, password, telephone, realname, avatar_image, email, job_name, job_type, permission, create_time) {
    const sql = `select * FROM user WHERE user_id=${userId}`
    const data = await this.query(sql)
    if (!data[0]) return '操作用户不存在！'
    const dataPermission = data[0].permission
    if (dataPermission !== 'root') return '没有权限操作！'
    const result = await this.insert('user', {
      username: username,
      password: password,
      telephone: telephone,
      realname: realname,
      avatar_image: avatar_image,
      email: email,
      job_name: job_name,
      job_type: job_type,
      permission: permission,
      user_type: permission === 'user' ? '管理员' : '普通用户',
      create_time: create_time
    })
    if (result) {
      return '新增成功'
    } else {
      return '新增失败'
    }
  }

  async edit (userId, id, username, telephone, realname, update_time, avatar_image, email, job_name, job_type) {
    const handlersSql = `select * FROM user WHERE user_id=${userId}`
    const handlersData = await this.query(handlersSql)
    const recipientSql = `select * FROM user WHERE user_id=${id}`
    const recipientData = await this.query(recipientSql)
    if (!handlersData[0]) return '操作用户不存在！'
    const handlersPermission = handlersData[0].permission
    const recipientPermission = recipientData[0].permission
    const data = {
      username: username,
      telephone: telephone,
      realname: realname,
      update_time: update_time,
      avatar_image: avatar_image,
      email: email,
      job_name: job_name,
      job_type: job_type
    }
    const options = {
      where: {
        user_id: id
      }
    }
    let result = false
    if (handlersPermission === 'root') {
      if (recipientPermission === 'root') { // 被操作者是管理员
        return '没有权限操作！'
      } else {
        result = await this.update('user', data, options)
      }
    } else { // 普通用户
      if (recipientPermission === 'root' || (userId !== id)) { // 被操作者是管理员或者别的普通用户
        return '没有权限操作！'
      } else {
        result = await this.update('user', data, options)
      }
    }
    if (result) {
      return '编辑成功'
    } else {
      return '编辑失败'
    }
  }

  async editPassWord (userId, id, password) {
    const handlersSql = `select * FROM user WHERE user_id=${userId}`
    const handlersData = await this.query(handlersSql)
    const recipientSql = `select * FROM user WHERE user_id=${id}`
    const recipientData = await this.query(recipientSql)
    if (!handlersData[0]) return '用户不存在！'
    if (!recipientData[0]) return '用户不存在！'
    if (userId !== id) return '没有权限修改其他用户密码'
    // const handlersPermission = handlersData[0].permission
    // const recipientPermission = recipientData[0].permission
    const data = {
      password: password
    }
    const options = {
      where: {
        user_id: id
      }
    }
    let result = false
    result = await this.update('user', data, options)
    // if (handlersPermission === 'root') {
    //   if (recipientPermission === 'root') { // 被操作者是管理员
    //     return '没有权限操作！'
    //   } else {
    //     result = await this.update('user', data, options)
    //   }
    // } else { // 普通用户
    //   if (recipientPermission === 'root' || (userId !== id)) { // 被操作者是管理员或者别的普通用户
    //     return '没有权限操作！'
    //   } else {
    //     result = await this.update('user', data, options)
    //   }
    // }
    if (result) {
      return '修改成功'
    } else {
      return '修改失败'
    }
  }

  async detail (id) {
    const sql = `select * FROM user WHERE user_id = ${id}`
    const data = await this.query(sql)
    if (!data[0]) return '用户不存在！'
    const userData = await this.get('user', {
      user_id: id
    })
    if (!userData) return '没有查到用户资料！'
    let obj = {
      id: String(userData.user_id),
      username: userData.username,
      telephone: userData.telephone,
      realname: userData.realname,
      avatarImage: userData.avatar_image,
      email: userData.email,
      jobName: userData.job_name,
      jobType: userData.job_type,
      userType: userData.user_type
    }
    return obj
  }

  // 获取用户列表接口的函数
  async list (page, count) {
    const start = (page - 1) * count // 开始的页数
    const sql = `SELECT * FROM user WHERE status = 1 LIMIT ${start}, ${count}` // 分页查询用户列表数据
    const sql1 = 'SELECT * FROM user WHERE status = 1' // 查询总的数据
    const data = await this.query(sql)
    let allData = {}
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
    
    allData.list = ajaxData
    const totalData = await this.query(sql1)
    const total = totalData.length
    allData.total = Math.ceil(total / count)

    return allData
  }

  async index () {
    this.ctx.body = 'hello world'
  }

  // 登录
  async login (username, password) { // 登陆
    let data = await this.get('user', {
      username: username,
      status: 1
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
      this.updateLoginTime(username) // 更新登录的时间

      return {
        msg: '登陆成功',
        login: true,
        data: data
      }
    }
  }

  // 更新最近登录的时间
  async updateLoginTime (username) {
    const timestamp = new Date.getTime()
    const time = this.ctx.helper.formatDate(timestamp, 'yyyy-mm-dd hh:mm:ss')
    const row = {
      login_time: time
    }
    const options = {
      where: {
        username: username
      }
    }
    const flag = await this.update('user', row, options)

    return flag
  }

  // 获取tokenKey
  async getTokenKey () { // 获取编码token的秘钥
    const data = await this.get('config', {
      id: 1
    })
    return JSON.stringify(data)
  }

  // 删除某个非root权限的用户
  async deleteUser (userId, id) {
    const sql = `SELECT * FROM user WHERE user_id = ${userId} and status = 1` // 查询操作用户的数据
    const data = await this.query(sql)

    if (!data[0]) return '操作用户不存在！'
    const permission = data[0].permission

    if (permission !== 'root') return '没有权限操作！'
    const deleteData = await this.get('user', {
      user_id: id
    })
    
    if (!deleteData) return '被删除用户不存在！'
    const status = deleteData.status
    
    if (status === 0) return '该用户已经被删除！'
    const flag = await this.delete('user', {
      where: {
        user_id: id
      }
    })

    if (flag) {
      return '操作成功!'
    } else {
      return '操作失败!'
    }
  }
  
  //id名获取 用户资料
  async getUserById(user_id) {
    const sql = `select * FROM user WHERE user_id=${user_id} And status=${1}`
    const data = await this.query(sql)
    return data
  }
}

module.exports = UserService