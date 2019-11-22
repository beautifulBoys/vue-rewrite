
const parse5 = require('parse5')
const {parseAttrs} = require('./attrs')

// 把节点对象拆分为目标对象
function htmlParse (dom) {
  let item = {}
  if (dom.tagName) {
    item.type = 'node'
    item.tagName = dom.tagName
    item.options = parseAttrs(dom.attrs)
  } else if (dom.nodeName && dom.nodeName === '#text') {
    item.type = 'text'
    item.nodeName = '#text'
    item.text = dom.value
  }
  if (dom.childNodes && dom.childNodes.length) {
    item.children = []
    for (let i = 0; i < dom.childNodes.length; i++) {
      item.children.push(htmlParse(dom.childNodes[i]))
    }
  }
  return item
}

// 把 dom 对象格式化为符合要求的 object
const parseDomToObject = (source) => {
  let dom = parse5.parseFragment(source)
  return htmlParse(dom)
}

export default parseDomToObject