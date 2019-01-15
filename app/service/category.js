const Service = require('./../core/base_service.js')

class CategoryService extends Service {
    // 首页主分类以及对应子分类的接口
    async home () {
        return ''
    }
    /**
     * 获取文章分类数据
     */
    async getCategory (conditions, pageNo, pageLength, categoryName) {
        let result = {
            paginator: {
                pageLength: pageLength,
                pageNo: pageNo,
                totalCount: 0
            }
        }
        let allData
        let resultList
        let allSql
        let sql
        if (categoryName) {
            allSql = `SELECT COUNT(1) FROM category WHERE category_name LIKE '%${categoryName}%' AND status IN(1)`
            // allSql = `SELECT * FROM category WHERE category_name LIKE '%${categoryName}%' AND status IN(1)`
            sql = `SELECT * FROM category WHERE category_name LIKE '%${categoryName}%' AND status IN(1) LIMIT ${Number(pageLength)} OFFSET ${pageLength * (Number(pageNo) - 1) || 0}`
            allData = await this.query(allSql)
            result.paginator.totalCount = JSON.parse(JSON.stringify(allData[0]))['COUNT(1)']
            resultList = await this.query(sql)
            result.resultList = resultList
        } else {
            allSql = `SELECT COUNT(1) FROM category WHERE status IN(1)`
            // allSql = `SELECT * FROM category WHERE status IN(1)`
            allData = await this.query(allSql)
            result.paginator.totalCount = JSON.parse(JSON.stringify(allData[0]))['COUNT(1)']
            resultList = await this.select('category', conditions)
            result.resultList = resultList
        }
        if (!allData || !resultList) {
            result = false
        }
        return result
    }
    /**
     * 新增文章分类
     */
    async addCategory (data) {
        const result = await this.insert('category', data)
        return result
    }

    /**
     * 修改分类
     */
    async editCategory (data, updateOptions) {
        const result = await this.update('category', data, updateOptions)
        return result
    }

    /**
     * 删除分类
     * @param {*} data更改status的转态
     * @param {*} updateOptions更改那一条数据
     */
    async deleteCategory (data, updateOptions) {
        const result = await this.update('category', data, updateOptions)
        return result
    }
}

module.exports = CategoryService