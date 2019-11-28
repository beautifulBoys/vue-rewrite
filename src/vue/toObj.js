const parse5 = require('parse5')
const {parseAttrs} = require('./attrs')

// 把节点对象拆分为目标对象
function htmlParse (obj) {
  let item = {}
  if (obj.tagName) {
    if (Vue.components[obj.tagName]) {
      item.type = 'component'
      item.tagName = obj.tagName
      item.options = parseAttrs(obj.attrs)
    } else {
      item.type = 'node'
      item.tagName = obj.tagName
      item.options = parseAttrs(obj.attrs)
    }
  } else if (obj.nodeName && obj.nodeName === '#text') {
    item.type = 'text'
    item.nodeName = '#text'
    item.text = obj.value
  }
  if (obj.childNodes && obj.childNodes.length) {
    item.childrens = []
    for (let i = 0; i < obj.childNodes.length; i++) {
      item.childrens.push(htmlParse(obj.childNodes[i]))
    }
  }
  return item
}

// 把 dom 对象格式化为符合要求的 object
const parseDomToObject = (source) => {
  let obj = parse5.parseFragment(source)
  return htmlParse(obj)
}

export default parseDomToObject