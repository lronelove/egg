const Service = require('./../core/base_service.js')

class JobService extends Service {
  async addJob(userId, job_name, job_code) {
    const sql = `SELECT * FROM user WHERE user_id = ${userId}`
    const data = await this.query(sql)

    if (!data[0]) return '操作用户不存在！'
    const permission = data[0].permission
    if (permission !== 'root') return '没有权限操作！'
    const jobSql = `SELECT * FROM jobs`
    const jobList = await this.query(jobSql)
    let flag = false
    if (jobList.length) {
      for (let i = 0, len = jobList.length; i <len; i++) {
        let item = jobList[i]
        if (item.status === 0) {
          break
        } else {
          if (job_name === item.job_name) {
            flag = true
            return '职位名称已存在'
          } else if (job_code === item.job_code) {
            flag = true
            return '职位编码已存在'
          }
        }
      }
    }
    
    if (!flag) {
      const result = await this.insert('jobs', {
        job_name: job_name,
        job_code: job_code
      })
      if (result) {
        return '新增成功！'
      } else {
        return '新增失败！'
      }
    }
  }

  async jobList () {
    const sql = `SELECT * FROM jobs`
    const jobList = await this.query(sql)
    let data = []
    if (jobList.length) {
      for (let i = 0, len = jobList.length; i <len; i++) {
        let item = jobList[i]
        if (item.status === 1) {
          data.push({
            id: String(item.id),
            name: item.job_name,
            code: item.job_code
          })
        }
      }
    }
    return data
  }
 
  async jobDetail (id) {
    const sql = `select * FROM jobs WHERE id = ${id}`
    const data = await this.query(sql)
    if (!data[0]) return '职位不存在！'
    if (data[0].status === 0) return '职位已被删除！'
    const jobData = await this.get('jobs', {
      id: id
    })
    if (!jobData) {
      return '没有查到职位资料!'
    } else {
      let obj = {}
      obj.id = String(jobData.id)
      obj.name = jobData.job_name
      obj.code = jobData.job_code
      return obj
    }
  }

  async editJob (userId, id, job_name, job_code) {
    const userSql = `select * FROM user WHERE user_id=${userId}`
    const userData = await this.query(userSql)
    if (!userData[0]) return '操作用户不存在！'
    if (userData[0].permission !== 'root') return '没有权限操作！'
    console.log('用户信息')
    console.log(userData[0].permission)
    const sql = `select * FROM jobs WHERE id = ${id}`
    const data = await this.query(sql)
    if (!data[0]) return '职位不存在！'
    if (data[0].status === 0) return '职位已被删除！'
    let updateData = {
      id: id,
      job_name:job_name,
      job_code: job_code
    }
    const result = await this.update('jobs', updateData)
    if (result) {
      return '编辑成功！'
    } else {
      return '编辑失败！'
    }
  }

  async deleteJob (userId, id) {
    const userSql = `select * FROM user WHERE user_id=${userId}`
    const userData = await this.query(userSql)
    if (!userData[0]) return '操作用户不存在！'
    if (userData[0].permission !== 'root') return '没有权限操作！'
    const deleteData = await this.get('jobs', {
      id: id
    })
    if (!deleteData) return '职位不存在！'
    if (deleteData.status === 0) return '职位已被删除！'
    console.log('开始删除')
    console.log(deleteData)
    console.log({id:id})
    const result = await this.delete('jobs', '',{
      id: id,
      status: 0
    })
    console.log('结果')
    console.log(result)
    if (result) {
      return '删除成功！'
    } else {
      return '删除失败！'
    }
  }
  
}

module.exports = JobService