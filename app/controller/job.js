'use strict';
/* 用户职位相关操作 */
const Controller = require('../core/base_controller.js')

class JobController extends Controller {
  // 新增用户职位
  async addJob () {
    const body = this.ctx.request.body
    const job_code = body.code || ''
    const job_name = body.name || ''
    const userId = body.userId || ''
    console.log('新增用户职位')
    console.log(userId)
    if (userId === '' || userId === null || userId === NaN) {
      this.fail('', 'userId不能为空')
    } else if (job_name === '') {
      this.fail('', '职位名称不能为空')
    } else if (job_code === '') {
      this.fail('', '职位编码不能为空')
    } else {
      const res = await this.ctx.service.job.addJob(parseInt(userId), job_name, job_code)
      this.success('', res) 
    }
  }

  async jobList () {
    const data = await this.ctx.service.job.jobList()
    this.success(data, '查询成功')
  }

  async jobDetail () {
    const query = this.ctx.query
    const id = query.id || ''
    if (id === '' || id === null || id === NaN) {
      this.fail('', '职位id不能为空')
    } else {
      const res = await this.ctx.service.job.jobDetail(parseInt(id))
      if (res instanceof Object) {
        this.success(res, '查询成功')  
      } else {
        this.success('', res)
      }
    }
  }

  async editJob () {
    const body = this.ctx.request.body
    const job_code = body.code || ''
    const job_name = body.name || ''
    const id = body.id || ''
    const userId = body.userId || ''
    if (userId === '' || userId === null || userId === NaN) {
      this.fail('', 'userId不能为空')
    } else if (id === '' || id === null || id === NaN) {
      this.fail('', '职位id不能为空')
    } else if (job_name === '' && job_code === '') {
      this.fail('', '职位名称或者职位编码不能同时为空')
    }else {
      const res = await this.ctx.service.job.editJob(parseInt(userId), parseInt(id), job_name, job_code)
      this.success('', res)
    }
  }

  async deleteJob () {
    const body = this.ctx.request.body
    const id = body.id || ''
    const userId = body.userId || ''
    if (userId === '' || userId === null || userId === NaN) {
      this.fail('', 'userId不能为空')
    } else if (id === '' || id === null || id === NaN) {
      this.fail('', '职位id不能为空')
    } else {
      const res = await this.ctx.service.job.deleteJob(parseInt(userId), parseInt(id))
      this.success('', res)
    }
  }

}

module.exports = JobController
