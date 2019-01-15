const Service = require("./../core/base_service.js")

class ArticleService extends Service {
  async getAdminAllReply (page, count) {
    // 管理员 获取所有回复
    const start = (page - 1) * count // 开始的页数
    let sql = `SELECT article.id as article_id, article.title,article.create_time,reply.id,
    reply.content, reply.reply_from_id,reply.reply_to_id, reply.reply_id FROM article, reply WHERE 
    article.id=reply.article_id AND reply.status IN(1) AND article.status IN(1) LIMIT ${start},${count}`
    const sql_total = `SELECT count(*) FROM reply,article WHERE reply.status=${1} AND article.status=${1} AND reply.article_id=article.id`
    //列表
    const data = await this.query(sql)
    //总数
    const total = await this.query(sql_total)
    return { list: data, total: total[0]["count(*)"] }
  }
  // 获取评论信息
  async getReplyInfo (id) {
    const sql = `SELECT  * FROM reply WHERE id=${id} AND status=${1}`
    const data = await this.query(sql)
    return data
  }
  //获取一级 评论
  async getAllReply(page, count, article_id) {
    const start = (page - 1) * count // 开始的页数
    const sql = `SELECT  * FROM reply WHERE article_id=${article_id} And reply_id=${0} And status=${1}  LIMIT ${start},${count}`
    const sql_total = `SELECT count(*) FROM reply WHERE article_id=${article_id} And status=${1} And reply_id=${0}`
    //列表
    const data = await this.query(sql)
    //总数
    const total = await this.query(sql_total)
    return { list: data, total: total[0]["count(*)"] }
  }
  //获取回复二级 所有评论
  async getReplyTwo(article_id,reply_id) {
    const sql = `SELECT  * FROM reply WHERE article_id=${article_id} And reply_id=${reply_id} And status=${1}`
    const data = await this.query(sql)
    return data
  }
  //生成一级评论 
  async createdOneReply(obj){
    const {article_id,reply_from_id,content,create_time} = obj
    const sql = `INSERT INTO reply (article_id,reply_from_id,content,create_time) VALUES (${article_id},${reply_from_id},'${content}','${create_time}')`
    const data = await this.query(sql)
    return data
  }
   //生成二级评论
   async createdTwoReply(obj){
    const {article_id,reply_from_id,content,reply_to_id,reply_id,create_time} = obj
    const sql = `INSERT INTO reply (article_id,reply_from_id,content,reply_to_id,reply_id,create_time) VALUES (${article_id},${reply_from_id},'${content}',${reply_to_id},${reply_id},'${create_time}')`
    const data = await this.query(sql)
    return data
  }
  // 册除评论
  async deletReplyById (id) {
    const sql = `UPDATE reply SET status=${0} WHERE id=${id}`
    const data = await this.query(sql)
    return data
  }
  /**
   * 获取文章列表
   * pageNo 必传，Number
   * pageLength 必传，Number
   * title  文章标题的模糊搜索
   * userId Array 用户Id的数组
   * categoryId Number分类ID
   */
  async getArticleList (params) {
    const {categoryId, pageNo, pageLength, title, userId} = params
    let allSql
    let sql
    let result = {
      paginator: {
        pageLength: pageLength,
        pageNo: pageNo,
        totalCount: 0
      }
    }
    if (categoryId) {
      allSql = `SELECT COUNT(1) FROM article WHERE status IN(1) AND article.category_id = ${categoryId}`
      // allSql =  `SELECT * FROM article WHERE status IN(1)`
      sql = `SELECT article.id, article.category_id, article.create_time, article.title, 
        article.content, article.view_number, user.username, user.avatar_image FROM article, user WHERE 
        article.user_id = user.user_id AND article.status IN(1) AND article.category_id = ${categoryId} 
        LIMIT ${Number(pageLength)} OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
    } else {
      if (title && userId.length > 0) {
        allSql = `SELECT COUNT(1) FROM article WHERE title LIKE '%${title}%' AND user_id IN(${userId.join(',')}) AND status IN(1)`
        // allSql =  `SELECT * FROM article WHERE title LIKE '%${title}%' AND user_id IN(${userId.join(',')}) AND status IN(1)`
        // sql = `SELECT * FROM article WHERE title LIKE '%${title}%' AND user_id IN(${userId.join(',')}) AND status IN(1) LIMIT ${Number(pageLength)} OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
        sql = `SELECT article.id, article.category_id, article.create_time, article.title, 
              article.content, article.view_number, user.username, user.avatar_image FROM article, user 
              WHERE article.user_id = user.user_id AND article.title LIKE '%${title}%' 
              AND article.user_id IN(${userId.join(',')}) AND article.status 
              IN(1) LIMIT ${Number(pageLength)} OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
      } else if (title && userId.length === 0) {
        allSql = `SELECT COUNT(1) FROM article WHERE title LIKE '%${title}%' AND status IN(1)`
        // allSql =  `SELECT * FROM article WHERE title LIKE '%${title}%' AND status IN(1)`
        sql = `SELECT article.id, article.category_id, article.create_time, article.title,
         article.content, article.view_number, user.username, user.avatar_image FROM article, user WHERE 
         article.user_id = user.user_id AND article.title LIKE '%${title}%' AND article.status IN(1) 
         LIMIT ${Number(pageLength)} OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
        // sql = `SELECT * FROM article WHERE title LIKE '%${title}%' AND status IN(1) LIMIT ${Number(pageLength)} OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
      } else if (!title && userId > 0) {
        allSql = `SELECT COUNT(1) FROM article WHERE user_id IN(${userId.join(',')}) AND status IN(1)`
        // allSql =  `SELECT * FROM article WHERE user_id IN(${userId.join(',')}) AND status IN(1)`
        sql = `SELECT article.id, article.category_id, article.create_time, article.title, 
        article.content, article.view_number, user.username, user.avatar_image FROM article, user WHERE 
        article.user_id = user.user_id AND article.user_id IN(${userId.join(',')}) AND article.status IN(1) 
        LIMIT ${Number(pageLength)} OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
        // sql = `SELECT * FROM article WHERE user_id IN(${userId.join(',')}) AND status IN(1) LIMIT ${Number(pageLength)} OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
      } else {
        allSql = `SELECT COUNT(1) FROM article WHERE status IN(1)`
        // allSql =  `SELECT * FROM article WHERE status IN(1)`
        sql = `SELECT article.id, article.category_id, article.create_time, article.title, 
          article.content, article.view_number, user.username, user.avatar_image FROM article, user WHERE 
          article.user_id = user.user_id AND article.status IN(1) LIMIT ${Number(pageLength)} 
          OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
      }
    }
    let allData = await this.query(allSql)
    let resultList = await this.query(sql)
    result.paginator.totalCount = JSON.parse(JSON.stringify(allData[0]))['COUNT(1)']
    result.resultList = JSON.parse(JSON.stringify(resultList))
    if (!allData || !resultList) {
      result = false
    }
    return result
  }

  /**
   *  新增文章
   * data 必传，新增的数据内容 
   */
  async addArticle (data, categoryData, updateOptions) {
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      await this.app.mysql.insert('article', data)
      await this.app.mysql.update('category', categoryData, updateOptions)
      return true;
    }, this.ctx);
    return result
  }

  /**
   * 删除文章
   */
  async deleteArticle (articleStatus, articleUpdataOptions, categoryCount, categoryUpdataOptions) {
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      await this.app.mysql.update('article', articleStatus, articleUpdataOptions)
      await this.app.mysql.update('category', categoryCount, categoryUpdataOptions)
      return true;
    }, this.ctx);
    return result
  }

  /**
   * 修改文章
   */
  async editArticle (data, updateOptions) {
    const result = await this.update('article', data, updateOptions)
    return result
  }

  /**
   * 查询单个文章
   * articleId Number 文章ID
   */
  async getArticle (params) {
    const {articleId} = params
    let sql = `SELECT article.id, article.category_id, article.create_time, article.title, 
    article.content, article.view_number, article.user_id, user.username, user.avatar_image FROM article, user WHERE 
    article.user_id = user.user_id AND article.status IN(1) AND id = ${articleId}`
    const result = await this.query(sql)
    if (result) {
      if (result.length === 0) {
        return {}
      } else {
        return JSON.parse(JSON.stringify(result))[0]
      }
    } else {
      return result
    }
  }

  /**
   * 增加浏览量
   */
  async addArticleVisitor (data, updateOptions) {
    const result = await this.update('article', data, updateOptions)
    return result
  }

  // 评论点赞
  async like (userId, replyId) {
    const sql = `SELECT * FROM reply WHERE id = ${+replyId}`
    const data = await this.query(sql)
    let like = data[0].like

    if ( !like ) { // 之前沒有被点赞过
        like = userId + ''
    } else {
        let likeArray = like.split(',')

        if (likeArray.includes(userId + '')) return false // 之前点过赞，其实前端有了过滤
        likeArray.push(userId + '')
        like = likeArray.join(',')
    }
    const res = await this.update('reply', { like: like }, { where: { id: +replyId } })

    return res
  }

  // 取消评论点赞
  async unlike (userId, replyId) {
    const sql = `SELECT * FROM reply WHERE id = ${+replyId}`
    const data = await this.query(sql)
    let like = data[0].like

    let likeArray = like.split(',')
    let index = likeArray.indexOf(userId + '')

    if ( index === -1 ) return false   
    likeArray.splice(index, 1)
    like = likeArray.join(',')
    const res = await this.update('reply', { like: like }, { where: { id: +replyId } })

    return res
  }
}

module.exports = ArticleService
