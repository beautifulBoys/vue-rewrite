// 去除两端空格、换行、回车
const trim = str => {
  return str.replace(/^[\s\r\n]+/, '').replace(/[\s\r\n]+$/, '')
}

// 解析类似（item, index） 这种
const splitKeyAndValue = str => {
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

exports.trim = trim
exports.splitKeyAndValue = splitKeyAndValue
