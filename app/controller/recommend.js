/*
 * @Description: 首页新增文档增删查改
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-01-02 11:09:21
 * @LastEditors: utaware
 * @LastEditTime: 2019-01-02 17:53:41
 */

const Controller = require('../core/base_controller.js')

// constant
const table_name = 'recommend_article'

class RecommendController extends Controller {

  /**
   * @description 查询查询推荐文章相关 get
   * @author utaware
   * @date 2019-01-02
   * @returns 
   */

  async index () {
    
    const { ctx, app } = this
    
    try {
      const query = await app.mysql.query('SELECT r.id, r.name, r.`desc`, r.type, ra.`name` as `docs_name`, ra.type as `category`, ra.url FROM recommend as r LEFT OUTER JOIN recommend_article AS ra ON r.id = ra.recommend_id WHERE r.status = 1 AND ra.status = 1;')
      const result = ctx.groupFilter(query, 'id', ['id', 'name', 'desc', 'type'], ['docs_name', 'category', 'url'], 'recommend')
      return ctx.end(true, {result})
    } catch (err) {
      return ctx.end(false, {err})
    }

  }

  /**
   * @description 新增推荐文章 post
   * @author utaware
   * @date 2019-01-02
   * @returns 
   */

  async create () {

    const { ctx, app } = this
    const { recommend_id, name, url, type } = ctx.request.body

    try {
      await app.mysql.insert(table_name, { recommend_id, name, url, type, status: 1})
      return ctx.end(true)
    } catch (err) {
      return ctx.end(false, {err})
    }

  }

  /**
   * @description 删除 delete
   * @author utaware
   * @date 2019-01-02
   * @returns 
   */

  async destroy () {
    
    const { ctx, app } = this
    const { id } = ctx.params

    try {
      await app.mysql.delete(table_name, {id})
      return ctx.end(true)
    } catch (err) {
      return ctx.end(false, {err})
    }

  }

  /**
   * @description 更新 put
   * @author utaware
   * @date 2019-01-02
   * @returns 
   */

  async update () {

    const { ctx, app } = this
    const { id } = ctx.params
    const { recommend_id, name, url, type } = ctx.request.body

    try {
      await app.mysql.update(table_name, {recommend_id, name, url, type}, {where: {id}})
      return ctx.end(true)
    } catch (err) {
      return ctx.end(false, {err})
    }

  }

  /**
   * @description 查询单个 get
   * @author utaware
   * @date 2019-01-02
   * @returns 
   */

  async show () {

    const { ctx, app } = this
    const { id } = ctx.params

    try {
      const result = await app.mysql.get(table_name, {id})
      return ctx.end(true, {result})
    } catch (err) {
      return ctx.end(false, {err})
    }

  }

}

module.exports = RecommendController
