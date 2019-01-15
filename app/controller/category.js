/* 处理分类相关操作 */
const Controller = require('../core/base_controller.js')

class CategoryController extends Controller {
  async home () {
    const ctx = this.ctx
    let data = await this.ctx.service.category.home()
    console.log(data)
    this.ctx.body = data
  }
  /**
   * 获取分类总数据
   * pageNo Number 或者 String
   * pageLength Number 或者 String
   * categoryName String  分类关键字搜索
   * queryAuthor String 作者关键字搜索 (目前不用)
   * 
   * 返回参数
   *  {
   *   paginator: {
          pageLength: pageLength, // 每页显示的长度
          pageNo: pageNo, // 当前页数
          totalCount: 0 // 总数据量
       },
       resultList: [{
         id: 1, // 分类ID
         category_name: '工具推荐', // 分类名称
         create_time: '2018-12-12', // 创建时间
         detail: '描述', // 描述
         article_count: '10' // 分类文章数 
       }]
   * }
   */
  async getCategory () {
    const {pageNo = 1, pageLength = 10, categoryName, queryAuthor} = this.ctx.request.body;
    if (this.ctx.helper.isInteger(pageNo) !== 3 || this.ctx.helper.isInteger(pageLength) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    let name
    let authorName
    if (categoryName) {
      name = this.app.validate('trim', categoryName)
    }
    if (queryAuthor) {
      // authorName = this.app.validate('trim', queryAuthor)
      authorName = ''
    }
    let userId = []
    if (authorName) {
      let authorSql = "SELECT * FROM user WHERE username LIKE '%" + authorName + "%'"
      let authors = await this.ctx.service.category.query(sql)
      if (!authors) {
        this.fail('', '网络异常')
        return false
      }
      for (let i = 0; i < authors.length; i++) {
        userId.push(authors[i].user_id)
      }
    }
    let conditions = {
      where: { status: 1 },
      limit: Number(pageLength),
      offset: pageLength * (Number(pageNo) - 1) || 0
    }
    const data = await this.ctx.service.category.getCategory(conditions, pageNo, pageLength, name)
    for (let i = 0; i < data.resultList.length; i++) {
      data.resultList[i].showTime = this.ctx.helper.timeFromNow(data.resultList[i].create_time)
    }
    if (data) {
      this.success(data)
    } else {
      this.fail('', '网络异常')
    }
  }
  /**
   * 新增文章分类
   * name 分类名称 String 必传
   * description 分类描述 String 必传
   */
  async addCategory () {
    const {name, description} = this.ctx.request.body
    let category_name = this.app.validate('trim', name)
    let detail = this.app.validate('trim', description)
    category_name = this.ctx.helper.safe(category_name)
    detail = this.ctx.helper.safe(detail)
    if (!category_name) {
      this.fail('', '分类名称不能为空')
      return false
    }
    if (!detail) {
      this.fail('', '分类描述不能为空')
      return false
    }
    let conditions = {
      where: {
        status: 1,
        category_name: category_name
      }
    }
    let list = await this.ctx.service.category.getCategory(conditions)
    if (!list) {
      this.fail('', '网络异常')
      return false
    }
    if (list.resultList.length > 0) {
      this.fail('', '分类名重复')
      return false
    }
    let createTime = this.ctx.helper.formatDate(new Date(), 'yyyy-mm-dd hh:mm:ss')
    let data = {
      category_name: category_name,
      detail: detail,
      article_count: 0,
      create_time: createTime
    }
    let result = await this.ctx.service.category.addCategory(data)
    if (result) {
      this.success('', '新建成功')
    } else {
      this.fail('', '新建失败')
    }
  }

  /**
   * 修改分类信息
   * name 分类名称 String 必传
   * description 分类描述 String 必传
   * id 分类ID Number,String 必传
   */
  async editCategory () {
    const {name, description, id} = this.ctx.request.body
    let category_name = this.app.validate('trim', name)
    let detail = this.app.validate('trim', description)
    category_name = this.ctx.helper.safe(category_name)
    detail = this.ctx.helper.safe(detail)
    if (this.ctx.helper.isInteger(id) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    let conditions = {
      where: { status: 1 }
    }
    let list = await this.ctx.service.category.getCategory(conditions)
    if (id === undefined) {
      this.fail('', '参数不全')
      return false
    }
    let classifyId = parseInt(id)
    let dataIndex = -1
    for(let i = 0; i < list.resultList.length; i++ ) {
      if (list.resultList[i].category_name === category_name && Number(list.resultList[i].id) !== classifyId) {
        this.fail('', '编辑失败，分类名称已存在')
        return false
      }
      if (Number(list.resultList[i].id) === classifyId) {
        dataIndex = classifyId
      }
    };
    if (dataIndex === -1) {
      this.fail('', '分类不存在')
      return false
    }
    let data = {
      category_name: category_name,
      detail: detail
    }
    let editPosition = {
      where: {
        id: classifyId
      }
    }
    let result = await this.ctx.service.category.editCategory(data, editPosition)
    if (result) {
      this.success('', '编辑成功')
    } else {
      this.fail('', '编辑失败')
    }
  }

  /**
   * 删除文章分类
   * id 分类ID String, Number 必传
   * userId 用户ID  String, Number 必传
   */
  async deleteCategory () {
    const {id, userId} = this.ctx.request.body
    if (this.ctx.helper.isInteger(id) !== 3 || this.ctx.helper.isInteger(userId) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    let userInfo = await this.ctx.service.user.getUserById(userId)
    if (!userInfo) {
      this.fail('', '网络异常')
      return false
    }
    if (userInfo.length === 0) {
      this.fail('', '用户不存在')
      return false
    }
    let classifyId = Number(id)
    let dataIndex = -1
    let conditions = {
      where: { status: 1 }
    }
    let list = await this.ctx.service.category.getCategory(conditions)
    for(let i = 0; i < list.resultList.length; i++ ) {
      if (Number(list.resultList[i].id) === classifyId) {
        dataIndex = classifyId
      }
    }
    if (dataIndex === -1) {
      this.fail('', '分类不存在')
      return false
    }
    let data = {
      status: 0
    }
    let editPosition = {
      where: {
        id: classifyId
      }
    }
    let result = await this.ctx.service.category.deleteCategory(data, editPosition)
    if (result) {
      if (result.length > 0) {
        if (userInfo[0].permisson !== 'root' && Number(result[0].user_id) !== Number(userId)) {
          this.fail('', '账号权限过低')
          return false
        }
      }
      this.success('', '删除成功')
    } else {
      this.fail('', '删除失败')
    }
  }

  /**
   * 增加文章数量
   * id Number ,String 分类ID必传
   */
  async addCategoryCount (id) {
    if (this.ctx.helper.isInteger(id) !== 3) {
      this.fail('', '参数有误')
      return false
    }
    let classifyId = Number(id)
    let dataIndex = -1
    let count = 0
    let conditions = {
      where: { status: 1 }
    }
    let list = await this.ctx.service.category.getCategory(conditions)
    for(let i = 0; i < list.resultList.length; i++ ) {
      if (Number(list.resultList[i].id) === classifyId) {
        dataIndex = classifyId
        count = list.resultList[i].article_count + 1
      }
    }
    if (dataIndex === -1) {
      this.fail('', '分类不存在')
      return false
    }
    let data = {
      article_count: count
    }
    let editPosition = {
      where: {
        id: classifyId
      }
    }
    let result = await this.ctx.service.category.updataCategory(data, editPosition)
    if (result) {
      this.success('', '新增文章成功')
    } else {
      this.fail('', '新增文章失败')
    }
  }
}

module.exports = CategoryController