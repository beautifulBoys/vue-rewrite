// 去除两端空格
function trim (str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '')
}

// 解析类似（item, index） 这种
exports.splitKeyAndValue = str => {
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