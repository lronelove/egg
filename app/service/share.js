const Service = require('./../core/base_service.js')

class ShareService extends Service {
	async index (conditions) {
    let {limit, offset, title} = conditions
    let sql = `SELECT * FROM share WHERE status = 1 AND title LIKE '%${title}%' ORDER BY create_time DESC LIMIT ${offset}, ${limit}`
		const result = await this.query(sql)
		return result
	}
	async add (data) {
		const result = await this.insert('share', data)
		return result
	}
	async delete (id) {
    let data = false
		const result = await this.app.mysql.update('share', {
      id: id,
      status: 0
    })

    if (result.affectedRows === 1) {
      const {count} = await this.ctx.service.statistics.queryShareCount()
      data = await this.app.mysql.update('statistics', {
        count: count - 1
      }, {
        where: {type: 'share'}
      })
    }    
    return result && data
	}
	async getById (id) {
		const result = await this.get('share', {
      id: id,
      status: 1
    }, {})
    
    return result
  }
  async update (data) {
    const result = await this.app.mysql.update('share', data)
    return result.affectedRows === 1
  }
}

module.exports = ShareService
