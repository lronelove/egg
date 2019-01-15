/*
 * @Description: 相关直接挂在到ctx上的一些直接性方法
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2018-12-03 17:59:09
 * @LastEditors: utaware
 * @LastEditTime: 2019-01-02 17:05:59
 */

module.exports = {
  
  /**
   * @description 对于response做数据整理
   * @author utaware
   * @date 2018-12-19
   * @param {number, boolean, object, string} args
   * @returns object 返回所需的ctx.response对象
   */
  mergeRes (...args) {
    // 类型检查
    let typeCheck = o => Object.prototype.toString.apply(o).slice(8, -1)
    // 包装器
    let container = {}
    // 类型匹配
    let match = {
        'Number': { name: 'status', merge: false },
        'String': { name: 'message', merge: false },
        'Object': { name: 'data', merge: true },
        'Boolean': { name: 'code', merge: false, format: v => (Number(v) - 1) }
    }
    // 简要模式判断
    let simple = args.some(v => typeCheck(v) === 'Boolean')
    // 循环遍历
    args.forEach((v) => {
        let type = typeCheck(v)
        let extend = match[type].name
        let merge = match[type].merge
        let format = match[type].format
        container[extend] = merge ? Object.assign({}, container[extend], v) : v
        container[extend] = format ? format(container[extend]) : v
    })
    // 获取simple的值
    let { code = 0, message = '', data = null, status = 200 } = container
    message = message || (code == 0 ? 'success' : 'fail')
    // 返回response
    return { status, body : { message, code, data } }
  },

  /**
   * @description 便于日志打印的标识方法
   * @author utaware
   * @date 2018-12-19
   * @param {any} msg 需要打印的信息
   * @param {string} [s='-'] 标识符号
   * @param {number} [n=16] 标识符号数量
   * @returns msg
   */
  log (msg, s = '-', n = 16) {
    // 定义标记  
    let sign = new Array(n).fill(s).join('')
    // 打印传入结果和标记分隔
    console.log(sign)
    console.log(msg)
    console.log(sign)
    return msg
  },
  // 异步forEach
  asyncForEach: async (array, fn) => {
    for (let i =0 ; i < array.length; i++) {
      await fn(array[i], i, array)
    }
  },

  /**
   * @description 筛选某个对象中所需字段
   * @author utaware
   * @date 2018-12-19
   * @param {object} o 所需筛选对象
   * @param {array} array 所需要筛选的条件
   * @param {boolean} equal 相等还是不等
   * @returns Object 筛选后的新对象
   */
  filterData (o, array, equal = true) {
    let t = {}, f = {}
    for (let keys in o) {
      array.includes(keys) ? t[keys] = o[keys] : f[keys] = o[keys]
    }
    return equal ? t : f
  },

  /**
   * @description 对于查询后数据的分组整理
   * @author utaware
   * @date 2019-01-02
   * @param {array} data 原始重复数据
   * @param {string} group 分组依据字段
   * @param {array} outer 外层保留结构
   * @param {array} inner 内层数组结构
   * @param {string} rename 内层包裹字段
   * @returns 
   */

  groupFilter (data, group, outer, inner, rename) {
    let copy = []

    data.forEach((val) => {
      // 是否存在
      let isExist = !!copy.filter(v => (v[group] === val[group])).length
      if (isExist) {
        copy.forEach(v => {
          if (v[group] === val[group]) {
            let o = {}
            inner.forEach(i => {
                o[i] = val[i]
            })
            v[rename].push(o)
          }
        })
      } else {
        let o = {}, p = {}
        outer.forEach(m => {
            o[m] = val[m]
        })
        o[rename] = []
        inner.forEach(n => {
            p[n] = val[n]
        })
        o[rename].push(p)
        copy.push(o)
      }
    })
    return copy
  }
}