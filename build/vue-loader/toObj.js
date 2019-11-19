
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
    // "第{{index}}项：{{item}}山"
    // "第"+index+"项："+item+"山"
    item.text = dom.value.replace(/\{\{([^\{\}]*)\}\}/g, '"+$1+"')
    // console.log(item.text)
  }
  if (dom.childNodes && dom.childNodes.length) {
    item.children = []
    for (let i = 0; i < dom.childNodes.length; i++) {
      item.children.push(htmlParse(dom.childNodes[i]))
    }
  }
  return item
}

// 获取当前文件的顶元素
function getTop (dom) {
  let topDoms = []
  for (let i = 0; i < dom.childNodes.length; i++) {
    let item = dom.childNodes[i]
    if (item.tagName && item.tagName === 'template') {
      for (let j = 0; j < item.content.childNodes.length; j++) {
        let childItem = item.content.childNodes[j]
        if (childItem.tagName) {
          topDoms.push(childItem)
        }
      }
    }
  }
  if (topDoms.length !== 1) {
    console.error('最外层元素有且只能有一个, 默认取第一个，忽略后来元素', topDoms)
  }
  return topDoms[0] || {}
}

// 把 dom 对象格式化为符合要求的 object
const parseDomToObject = (source) => {
  let dom = parse5.parseFragment(source)
  // console.log(obj)
  let top = getTop(dom)
  return htmlParse(top)
}

module.exports = parseDomToObject