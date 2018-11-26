const Service = require('./../core/base_service.js')

class HomeService extends Service {
    // 首页导航数据获取接口
    async nav () {
      const sql = `SELECT * FROM home_nav` // 查询所有得导航字段
      const res = await this.query(sql)
      const data = []
      
      res.forEach(item => {
        data.push({
          navName: item.nav_name,
          url: item.url
        })

      })
      return data 
    }

    // 首页推荐文章模块接口q                                                                                                                                                                                        

    async recommend () {
      const sql1 = `SELECT * FROM recommend` // 查询所有推荐的主分类
      let data = []
      const res = await this.query(sql1)

      for (let i = 0, len = res.length; i < len; i++) {
        let item = res[i]
        let id = item.id
        const sql2 = `SELECT * FROM recommend_article WHERE recommend_id = ${id}` // 根据主分类id，查询下面的子分类文章
        let children = await this.query(sql2);

        data.push({
          id: item.id,
          name: item.name,
          desc: item.desc,
          children: children
        })
      }

      return data
    }
}

module.exports = HomeService