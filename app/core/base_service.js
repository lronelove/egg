const Service = require('egg').Service;

// 基础service类
class BaseService extends Service {
    // 在表tableName里面查询数据，查询条件是queryOptions
    async get (tableName, queryOptions) {
        const data = await this.app.mysql.get(tableName, queryOptions)

        return data
    }

    // 在表tableName里面添加一个行数据,insertOptions是插入的字段
    async insert (tableName, insertOptions) {
        const data = await this.app.mysql.insert(tableName, insertOptions)

        return data.affectedRows === 1
    }

    // 在表tableName里面删除一行数据,deleteOptions是查询的字段
    async delete (tableName, deleteOptions) {
        const data = await this.app.mysql.delete(tableName, deleteOptions)

        return data.affectedRows === 1
    }

    // 在表tableName里面更改一条数据，updateOptions是更改的配置,row是更改的数据
    async update (tableName, row, updateOptions) {
        const data = await this.app.mysql.update(tableName, row, updateOptions)

        return data.affectedRows === 1
    }

    // 功能和get方法大致相同查询一条或者多条数据，但是select支持条件查询和结果定制
    async select (tableName, selectOptions) {
        const data = await this.app.mysql.select(tableName, selectOptions)

        return data
    }

    // 使用mysql语句的查询方式 
    async query (sql, valuesArray) {
        const data = await this.app.mysql.query(sql, valuesArray)

        return data
    }
}

module.exports = BaseService