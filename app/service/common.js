const Service = require('./../core/base_service.js')

// 公共的一些服务
class CommonService extends Service {
   // 查询职位分类
   async queryJobTypes () {
      const res = await this.update('jobs', { create_time: '2018-12-26 00:00:01' } , { where: { id: 4 } })
      const sql = 'SELECT * FROM jobs'
      const data = await this.query(sql)
      data.res = res
      return data
   }

   // 判断是否是管理员
   async isRoot (userId) {
   		const sql = `SELECT * FROM user WHERE user_id = ${userId} and status = 1` // 查询操作用户的数据
    	const data = await this.query(sql)

    	if (!data[0]) { // 用户不存在
    		return false
    	} else {
    		const permission = data[0].permission
    	}

    	return permission === 'root' ? true : false
   }
}

module.exports = CommonService