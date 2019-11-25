
// const loaderUtils = require('loader-utils')
const parseDomToObject = require('./toObj')
const parseObjToRender = require('./toRender')

// 主函数
module.exports = function (source, map) {
  this.cacheable()
  // 获取参数
  // var options = loaderUtils.getOptions(this)
  let obj = parseDomToObject(source)
  console.log(obj)
  source = parseObjToRender(obj)

  this.callback(null, source, map)
  return source
}