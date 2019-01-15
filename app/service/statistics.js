const Service = require('./../core/base_service.js')

class StatisticsService extends Service {
	// 每周分享的次数
	async queryShareCount () {
		const sql = `SELECT * FROM statistics WHERE type = 'share' `
		const data = await this.query(sql)
		const count = data[0].count

		return { count }
	}
}

module.exports = StatisticsService
