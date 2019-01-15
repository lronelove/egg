const Controller = require('../core/base_controller.js')
const MSG_NORESULT = '没有这条数据'
const MSG_SUCCESS = '提交成功'
const MSG_FAIL = '提交失败'
class ShareController extends Controller {
	// 获取分享，默认分页是offset:0,limit:10
	async index () {
		let result
		let { pageSize, pageNum, title} = this.ctx.query

		pageSize = pageSize ? parseInt(pageSize) : 10
    pageNum = pageNum ? parseInt(pageNum) : 1
    title = title || ''
		let conditions = {
      title,
			limit: pageSize || 10,
			offset: pageSize * (pageNum - 1) || 0
		}
		// 获取shareList, 如果有数据则遍历获取所有articleIds，根据articleIds查出articles分配到每条Share
		result = await this.ctx.service.share.index(conditions)
		if (result.length) {
			let articleIds = getIds(result, 'articles_id')
			let articleList = await this.app.mysql.select('article', {
				where: { id: articleIds }
			})
			articleList = await setUsername.call(this, articleList)
			result = addArticleToShare(articleList, result)
    }
    let {count} = await this.ctx.service.statistics.queryShareCount()

		this.success({shareList: result, totalCount: count}, '查询成功')
	}
	// 添加分享
	async add () {
		let { title, articles_id } = this.ctx.request.body
		let create_time = Date.now()
		const data = await this.ctx.service.share.add({ title, articles_id })
		if (data) {
			this.success(MSG_SUCCESS)
		} else {
			this.fail(MSG_FAIL)
		}
	}
	// 删除分享
	async delete () {
		let msg
		let { id } = this.ctx.request.body
		let share = await this.ctx.service.share.getById(id)
		if (share) {
			const data = await this.ctx.service.share.delete(id)
			msg = data ? { type: 'success', msg: MSG_SUCCESS } : { type: 'fail', msg: MSG_FAIL }
		} else {
			msg = { type: 'fail', msg: MSG_NORESULT }
		}
		this[msg.type](msg.msg)
	}
	// 通过id获取分享
	async getById () {
		let { id } = this.ctx.query
		let share = await this.ctx.service.share.getById(id)
		if (share) {
			let articleIds = share.articles_id.split(',')
			let articleList = await this.app.mysql.select('article', {
				where: { id: articleIds }
			})
			articleList = await setUsername.call(this, articleList)
			share.articles = articleList.filter((articleFilter) => !!articleFilter)
			this.success(share, '查询成功')
		} else {
			this.fail(MSG_NORESULT)
		}
	}
	async update () {
    let msg
		let { id, title, articles_id } = this.ctx.request.body
		let share = await this.ctx.service.share.getById(id)

    if (share) {
      let data = await this.ctx.service.share.update({
        id,
        articles_id,
        title
      })
      msg = data ? { type: 'success', msg: MSG_SUCCESS } : { type: 'fail', msg: MSG_FAIL }
    } else {
			msg = { type: 'fail', msg: MSG_NORESULT }
    }
    this[msg.type](msg.msg)
	}
}

function addArticleToShare (articleList, shareList) {
	return shareList.map((item) => {
		let articleIds = item.articles_id.split(',')
		let articles = articleIds
			.map((articleId) => {
				return articleList.filter((filterItem) => {
					return filterItem.id - articleId === 0
				})[0]
			})
			.filter((articleFilter) => {
				return articleFilter
			})
		item.articles = articles
		return item
	})
}

function getIds (arr, key) {
	return Array.from(
		new Set(
			arr.reduce((prev, next) => {
				return prev.concat(next[key].toString().split(','))
			}, [])
		)
	).map((item) => parseInt(item))
}

async function setUsername (articleList) {
	if (articleList.length) {
		let userIds = getIds(articleList, 'user_id')
		let userList = await this.app.mysql.select('user', {
			where: { user_id: userIds }
		})

		articleList.forEach((item) => {
			let { username } = userList.filter((filterItem) => filterItem.user_id === item.user_id)[0]
			item.username = username
		})
	}
	return articleList
}

module.exports = ShareController
