// 去除两端空格、换行、回车
export const trim = str => {
  return str.replace(/^[\s\r\n\t]+/, '').replace(/[\s\r\n\t]+$/, '')
}

// 解析类似（item, index） 这种
export const splitKeyAndValue = str => {
  str = trim(str)
  if (str.indexOf('(') > -1 && str.indexOf(')') > -1) {
    // 存在括号
    return str
  } else if (str.indexOf('(') < 0 && str.indexOf(')') < 0) {
    // 不存在括号
    return `(${str})`
  } else {
    console.error('传值非法')
  }
}

// 解析 v-for 参数
export const getVForOptions = text => {
  // text = '(item, index) in list'
  let options = {
    item: 'item',
    index: 'index',
    methods: 'in',
    list: 'list'
  }
  let arr = trim(text).split(' in ')
  options.list = arr[1]
  let str = arr[0].replace(/[\s()]+/g, '')
  if (str.indexOf(',') > -1) {
    let list = str.split(',')
    options.item = list[0]
    options.index = list[1]
  } else {
    options.item = list[0]
  }
  return options
}

// 压缩 html 代码
export const minifyHtml = str => {
  str = str
  .replace(/[\f\n\r\t\v]/ig, '')
  .replace(/[ ]+/ig, ' ')
  .replace(/>[ ]+</ig, '><')
  .replace(/>[ ]+(.*)[ ]+</ig, '>$1<')
  str = trim(str)
  return str
}

