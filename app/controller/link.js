/*
 * @Description: 首页banner图增删查改
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-01-02 11:09:21
 * @LastEditors: utaware
 * @LastEditTime: 2019-01-02 17:55:07
 */

const Controller = require('../core/base_controller.js')

// constant
const table_name = 'link'

class LinkController extends Controller {

  /**
   * @description 查询所有 get
   * @author utaware
   * @date 2019-01-02
   * @returns 
   */

  async index () {
    
    const { ctx, app } = this
    
    try {
      const result = await app.mysql.select(table_name)
      return ctx.end(true, {result})
    } catch (err) {
      return ctx.end(false, {err})
    }

  }

  /**
   * @description 新增 post
   * @author utaware
   * @date 2019-01-02
   * @returns 
   */

  async create () {

    const { ctx, app } = this
    const { desc, url, type } = ctx.request.body

    try {
      await app.mysql.query("INSERT INTO link (type, `desc`, url, create_time) VALUES (?, ?, ?, NOW());", [type, desc, url])
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
    const { desc, url, type } = ctx.request.body

    try {
      await app.mysql.update(table_name, {desc, url, type}, {where: {id}})
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

module.exports = LinkController