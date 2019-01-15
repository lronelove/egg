/* 处理文章详情，列表以及对应回复的操作 */
const Controller = require('../core/base_controller.js')
class ArticleController extends Controller { 
 async getReply () {
   const {page = 1,count = 10,article_id=null ,user_id=null} = this.ctx.request.body
   //验证
     if(article_id===null){
       this.fail('','参数错误')
       return
     }
   let userData = null
    if (user_id) { 
      userData = await this.ctx.service.user.getUserById(user_id)
    }
   
   const data = await this.ctx.service.article.getAllReply(Number(page),Number(count),Number(article_id))
   const FromMsq = (data) => {
    if(data.length === 0){ return {}}
    let {avatar_image,user_id,username} = data[0]
    return {avatar_image,user_id,username}
   }
   for(let item of data.list){
      //查询一级评论者信息
      item.create_time = this.ctx.helper.timeFromNow(item.create_time)
      let user_info = await this.ctx.service.user.getUserById(item.reply_from_id)
      item.user_info = FromMsq(user_info)
      // 点赞
      let likeArr = item.like?item.like.split(","):[]
      item.isActive = !user_id || likeArr.indexOf(String(userData[0].user_id))===-1?false:true
      item.likeNum = likeArr.length
      //查询评论下所有的回复 
      let list_data = await this.ctx.service.article.getReplyTwo(article_id,item.id)

      for(let item of list_data){
          //评论者信息
          item.create_time = this.ctx.helper.timeFromNow(item.create_time)
          let user_info = await this.ctx.service.user.getUserById(item.reply_from_id)
          item.user_info = FromMsq(user_info)
          // 点赞
          let likeArr = item.like?item.like.split(","):[]
          item.isActive = !user_id || likeArr.indexOf(String(userData[0].user_id))===-1?false:true
          item.likeNum = likeArr.length
          //被评论者 信息
          let resp_info = await this.ctx.service.user.getUserById(item.reply_to_id)
          item.resp_info = FromMsq(resp_info)
          delete item.status
          delete item.reply_to_id
          delete item.reply_from_id
      }
      item.list = list_data
      delete item.status
      delete item.reply_to_id
      delete item.reply_from_id
   }
   this.success(data)
 }
 async postReply () {
    let {article_id,reply_from_id,reply_to_id=0,reply_id=0,content=''} = this.ctx.request.body
    let data,create_time;
    content = this.ctx.helper.safe(content)
    create_time = this.ctx.helper.formatDate(new Date().getTime(), 'yyyy-mm-dd hh:mm:ss')
    if (reply_id===0) {
      //如果提交一级评论
      if(!article_id||!reply_from_id){
        this.fail('','参数错误')
      }
     data = await this.ctx.service.article.createdOneReply({reply_from_id,content,article_id, create_time})
    }else{
      //如果提交二级评论
      if(!article_id||!reply_from_id||!reply_id){
        this.fail('','参数错误')
      }
      data = await this.ctx.service.article.createdTwoReply({reply_from_id,content,reply_to_id,reply_id,article_id, create_time})
    }
    if (data.affectedRows == 1) {
      this.success('', '成功')
    } else {
      this.fail('','新增失败')
    }
 }
 // 册除回复
 async deleteReply () {
  let {reply_id} = this.ctx.request.body
  if(!reply_id){
    this.fail('','参数错误')
  }
  let data = await this.ctx.service.article.deletReplyById(reply_id)
  if (data.affectedRows == 1) {
    this.success('', '成功')
  } else {
    this.fail('','册除失败')
  }
 }
 async getReplyInfo () {
  let {id=null} = this.ctx.query
  if (id===null) {
    this.fail('','参数错误')
    return
  }
  const FromMsq = (data) => {
    if(data.length === 0){ return {}}
    let {avatar_image,user_id,username} = data[0]
    return {avatar_image,user_id,username}
  }
  let data = await this.ctx.service.article.getReplyInfo(Number(id))
  let list_data = []
  // 一级评论者信息
  if(data.length===0){
    this.fail({},'未找到评论或上级评论')
    return
  }
  for (let item of data) {
    let user_info = await this.ctx.service.user.getUserById(item.reply_from_id)
     item.user_info = FromMsq(user_info)
     item.create_time = this.ctx.helper.timeFromNow(item.create_time)
  }
  // 二级评论者信息
  if(data.length>0){
    list_data = await this.ctx.service.article.getReplyTwo(Number(data[0].article_id), Number(data[0].id))
    for (let item of list_data) {
        //评论者信息
        item.create_time = this.ctx.helper.timeFromNow(item.create_time)
        let user_info = await this.ctx.service.user.getUserById(item.reply_from_id)
        item.user_info = FromMsq(user_info)
        //接收评论者 信息
        let resp_info = await this.ctx.service.user.getUserById(item.reply_to_id)
        item.resp_info = FromMsq(resp_info)
        delete item.status
        delete item.reply_to_id
        delete item.reply_from_id
    } 
  }
  data[0].list = list_data 
  this.success(data[0], '成功')
 }
 // 拉取所有回复
 async getAdminAllReply () {
   const {page = 1,count = 10, user_id = null} = this.ctx.query;
   if(user_id === null){
     this.fail('','你的账号不是管理员')
   }
   let user_info = await this.ctx.service.user.getUserById(user_id)
   if(user_info.length === 0 || user_info.permission !== 'root'){
     this.fail('','你的账号不是管理员')
   }
   const FromMsq = (data) => {
    if(data.length === 0){ return {}}
    let {avatar_image,user_id,username} = data[0]
    return {avatar_image,user_id,username}
  }
   let data = await this.ctx.service.article.getAdminAllReply(page,count)
   for (let item of data.list) {
    let user_info = await this.ctx.service.user.getUserById(item.reply_from_id)
    item.user_info = FromMsq(user_info)
    item.resp_info = null
    if (Number(item.reply_to_id) !== 0) {
      let resp_info = await this.ctx.service.user.getUserById(item.reply_to_id)
      item.resp_info = FromMsq(resp_info)
    }
   }
   this.success(data, '成功') 
  }
 /**
  * 获取文章列表
  * pageNo = 1, String, Number 默认是1 
  * pageLength = 10 String, Number 默认是10 
  * categoryId String, Number // 分类ID
  * queryTitle String  标题关键字搜索
  * queryAuthor String 作者关键字搜索
  * 返回参数{
        paginator: {
          pageLength: pageLength, // 每页显示的长度
          pageNo: pageNo, // 当前页数
          totalCount: 0 // 总数据量
        },
        resultList: [{
         id: 1, // 文章ID
         category_id: 1, // 分类id
         create_time: '2018-12-12', // 创建时间
         title: '文章标题', // 文章标题
         content: '文章内容', // 文章内容
         author: '作者', // 作者
         view_count: 888 // 浏览人数
        }]
      }
  */
  async getArticleList () {
    const {pageNo = 1, pageLength = 10, categoryId, queryTitle, queryAuthor} = this.ctx.request.body;
    if (this.ctx.helper.isInteger(pageNo) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    if (this.ctx.helper.isInteger(pageLength) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    if (categoryId && this.ctx.helper.isInteger(categoryId) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    let title
    let authorName
    if (queryTitle) {
      title = this.app.validate('trim', queryTitle)
    }
    if (queryAuthor) {
      authorName = this.app.validate('trim', queryAuthor)
    }
    let userId = []
    if (authorName) {
      let authorSql = "SELECT * FROM user WHERE username LIKE '%" + authorName + "%'"
      let authors = await this.ctx.service.article.query(sql)
      if (!authors) {
        this.fail('', '网络异常')
        return false
      }
      for (let i = 0; i < authors.length; i++) {
        userId.push(authors[i].user_id)
      }
    }
    let sql
    let article
    let authorInfo
    article = await this.ctx.service.article.getArticleList({categoryId, pageNo, pageLength, title, userId})
    if (!article) {
      this.fail('', '网络异常')
    }
    for (let i = 0; i < article.resultList.length; i++) {
      article.resultList[i].showTime = this.ctx.helper.timeFromNow(article.resultList[i].create_time)
    }
    this.success(article)
  }

  /**
   * 新增文章
   * categoryId: 分类id 必传 Number
   * title: 文章题目 必传 String
   * content: 文章内容 必传 String
   * userId: 用户id 必传 Number String
   */
  async addArticle () {
    let dataIndex = -1 // 用于判断分类是否存在
    let count = 0 // 分类为文章的数量
    const {categoryId, title, content, userId} = this.ctx.request.body;
    if (this.ctx.helper.isInteger(categoryId) !== 3 || this.ctx.helper.isInteger(userId) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    let category_id = parseInt(this.app.validate('trim', categoryId.toString()))
    let articleTitle = this.app.validate('trim', title)
    articleTitle = this.ctx.helper.safe(articleTitle)
    let articleContent = this.app.validate('trim', content)
    let user_id = parseInt(this.app.validate('trim', userId.toString()))
    if (!category_id) {
      this.fail('', '参数不全')
      return false
    }
    if (!articleTitle) {
      this.fail('', '标题不能为空')
      return false
    }
    if (!articleContent) {
      this.fail('', '内容不能为空')
      return false
    }
    if (!user_id) {
      this.fail('', '参数不全')
      return false
    }
    let conditions = {
      where: { status: 1 }
    }
    let list = await this.ctx.service.category.getCategory(conditions)
    if (!list.resultList) {
      this.fail('', '网络异常')
      return false
    }
    for(let i = 0; i < list.resultList.length; i++ ) {
      if (parseInt(list.resultList[i].id) === parseInt(category_id)) {
        dataIndex = parseInt(category_id)
        count = parseInt(list.resultList[i].article_count) + 1
      }
    }
    if (dataIndex === -1) {
      this.fail('', '分类不存在')
      return false
    }
    let createTime = this.ctx.helper.formatDate(new Date(), 'yyyy-mm-dd hh:mm:ss')
    let data = {
      category_id: category_id,
      title: articleTitle,
      content: articleContent,
      user_id: user_id,
      create_time: createTime
    }
    // 增加文章
    let categoryData = {
      article_count: count
    }
    let editPosition = {
      where: {
        id: category_id
      }
    }
    let result = await this.ctx.service.article.addArticle(data, categoryData, editPosition)
    if (result) {
      this.success('', '文章添加成功')
    } else {
      this.fail('', '文章添加失败')
    }
  }

  /**
   * 删除文章
   * userId 用户ID String, Number 必传
   * articleId 文章ID  String, Number 必传
   */
  async deleteArticle () {
    const {userId, articleId} = this.ctx.request.body
    if (this.ctx.helper.isInteger(userId) !== 3 || this.ctx.helper.isInteger(articleId) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    if (!parseInt(userId)) {
      this.fail('', '参数不全')
      return false
    }
    let userInfo = await this.ctx.service.user.getUserById(parseInt(userId))
    if (!userInfo) {
      this.fail('', '网络异常')
      return false
    }
    if (userInfo.length === 0) {
      this.fail('', '用户不存在')
      return false
    }
    let article_id = parseInt(articleId)
    let condition = {
      where: {
        id: article_id,
        status: 1
      }
    }
    let article = await this.ctx.service.article.getArticle({articleId})
    if (!article) {
      this.fail('', '网络异常')
      return false
    }
    if (Object.keys(article).length === 0) {
      this.fail('', '文章不存在')
      return false
    }
    let categoryId = parseInt(article.category_id)
    let categoryCondition = {
      id: categoryId
    }
    // 分类信息
    let categoryData = await this.ctx.service.category.getCategory(categoryCondition)
    if (!categoryData) {
      this.fail('', '网络异常')
      return false
    }
    if (categoryData.resultList.length === 0) {
      this.fail('', '数据异常')
      return false
    }
    if (userInfo[0].permisson !== 'root' && parseInt(article.user_id) !== parseInt(userId)) {
      this.fail('', '账号权限过低')
      return false
    }
    let articleStatus = {
      status: 0
    }
    let articleUpdataOptions = {
      where: {
        id: article_id
      }
    }
    let categoryCount = {
      article_count: parseInt(categoryData.resultList[0].article_count) > 0 ? parseInt(categoryData.resultList[0].article_count) - 1 : 0
    }
    let categoryUpdataOptions = {
      where: {
        id: categoryId
      }
    }
    let result = await this.ctx.service.article.deleteArticle(articleStatus, articleUpdataOptions, categoryCount, categoryUpdataOptions)
    if (result) {
      this.success('', '删除成功')
    } else {
      this.fail('', '删除失败')
    }
  }

  /**
   * 编辑文章
   * categoryId String Number必传 分类ID
   * title String必传 文章题目
   * content String必传 文章内容
   * userId String Number必传 用户ID
   * articleId String Number必传 文章Id
   */
  async editArticle () {
    let dataIndex = -1 // 用于判断分类是否存在
    let count = 0 // 分类为文章的数量
    const {categoryId, title, content, userId, articleId} = this.ctx.request.body
    if (this.ctx.helper.isInteger(categoryId) !== 3 || this.ctx.helper.isInteger(userId) !== 3 || this.ctx.helper.isInteger(articleId) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    let articleTitle = this.app.validate('trim', title)
    articleTitle = this.ctx.helper.safe(articleTitle)
    let articleContent = this.app.validate('trim', content)
    if (!parseInt(articleId)) {
      this.fail('', '参数不全')
      return false
    }
    if (!parseInt(categoryId)) {
      this.fail('', '参数不全')
      return false
    }
    if (!articleTitle) {
      this.fail('', '文章题目不能为空')
      return false
    }
    if (!articleContent) {
      this.fail('', '文章内容不能为空')
      return false
    }
    let conditions = {
      where: { status: 1 }
    }
    let list = await this.ctx.service.category.getCategory(conditions)
    if (!list.resultList) {
      this.fail('', '网络异常')
      return false
    }
    for(let i = 0; i < list.resultList.length; i++ ) {
      if (parseInt(list.resultList[i].id) === parseInt(categoryId)) {
        dataIndex = parseInt(categoryId)
        count = parseInt(list.resultList[i].article_count) + 1
      }
    }
    if (dataIndex === -1) {
      this.fail('', '此分类不存在')
      return false
    }
    if (!parseInt(userId)) {
      this.fail('', '参数不全')
      return false
    }
    let userInfo = await this.ctx.service.user.getUserById(parseInt(userId))
    if (!userInfo) {
      this.fail('', '网络异常')
      return false
    }
    if (userInfo.length === 0) {
      this.fail('', '用户不存在')
      return false
    }
    let article = await this.ctx.service.article.getArticle({articleId})
    if (!article) {
      this.fail('', '网络异常')
    }
    if (Object.keys(article).length === 0) {
      this.fail('', '文章不存在')
      return false
    }
    if (userInfo[0].permisson !== 'root' && parseInt(article.user_id) !== parseInt(userId)) {
      this.fail('', '账号权限过低')
      return false
    }
    let data = {
      category_id: parseInt(categoryId),
      title: articleTitle,
      content: articleContent,
    }
    let updateOptions = {
      where: {
        id: parseInt(articleId),
        status: 1
      }
    }
    let result = await this.ctx.service.article.editArticle(data, updateOptions)
    if (result) {
      this.success('', '修改成功')
    } else {
      this.fail('', '修改失败')
    }
  }

  /**
   * 查询单个文章详情
   * articleId Number String 必传 文章Id
   */
  async getArticle () {
    const {articleId} = this.ctx.request.body
    if (parseInt(articleId)) {
      this.fail('', '参数不全')
    }
    let data = await this.ctx.service.article.getArticle({articleId})
    if (data) {
      let obj = {}
      if (Object.keys(data).length > 0) {
        const {id, category_id, create_time, title, content, username, avatar_image, view_number} = data
        obj = {
          id: id,
          category_id: category_id,
          create_time: create_time,
          title: title,
          content: content,
          username: username,
          avatar_image: avatar_image,
          view_number: view_number
        }
        obj.showTime = this.ctx.helper.timeFromNow(data.create_time)
      }
      this.success(obj)
    } else {
      this.fail('', '网络异常')
    }
  }
  
  /**
   * 添加浏览量
   * articleId Number String 必传 文章Id
   */
  async addArticleVisitor () {
    const {articleId} = this.ctx.request.body
    if (!parseInt(articleId)) {
      this.fail('', '参数不全')
    }
    let article = await this.ctx.service.article.getArticle({articleId})
    if (!article) {
      this.fail('', '网络异常')
    }
    if (Object.keys(article).length === 0) {
      this.fail('', '文章不存在')
      return false
    }
    let data = {
      view_number: parseInt(article.view_number) + 1,
    }
    let updateOptions = {
      where: {
        id: parseInt(articleId),
        status: 1
      }
    }
    let result = await this.ctx.service.article.addArticleVisitor(data, updateOptions)
    if (result) {
      this.success('', '添加浏览量成功')
    } else {
      this.fail('', '网络异常')
    }
  }

  // 评论点赞
  async like () {
    const body = this.ctx.request.body
    const { userId, replyId } = body
    const data = await this.ctx.service.article.like(userId, replyId)

    if (data) {
      this.success('', '点赞成功')
    } else {
      this.fail('', '操作失效')
    }
  }

  // 评论取消点赞
  async unlike () {
    const body = this.ctx.request.body
    const { userId, replyId } = body
    const data = await this.ctx.service.article.unlike(userId, replyId)

    if (data) {
      this.success('', '取消点赞成功')
    } else {
      this.fail('', '操作失败')
    }
  }
}

module.exports = ArticleController