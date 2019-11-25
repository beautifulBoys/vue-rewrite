
// 创建文本节点
const _t = (obj) => {
  return document.createTextNode(obj.text)
}
// 创建循环节点
const _l = (obj) => {
  console.log(obj)
  let arr = []
  JSON.parse(obj.options['v-for'].list).forEach(item => {
    arr.push(_c(obj))
  })
  return _c(obj)
}
// 创建节点
const _o = (obj) => {
  if (obj.type === 'node') {
    if (obj.options['v-for']) {
      return _l(obj)
    } else {
      return _c(obj)
    }
  } else if (obj.type === 'text') {
    return _t(obj)
  }
}

// 创建节点
const _c = (obj) => {
  let tagName = obj.tagName
  let options = obj.options || {}
  let children = obj.children || []
  // console.log(tagName, Vue.components, Vue.components[tagName])
  if (Vue.components[tagName]) {
    return new Vue(Vue.components[tagName]).$el
  } else {
    let el = document.createElement(tagName)
    for (let k in options) { // staticClass, attrs
      if (k === 'attrs') {
        for (let j in options.attrs) {
          el.setAttribute(j, options.attrs[j])
        }
      } else if (k === 'staticClass') {
        el.setAttribute('class', options[k])
      } else if (k === 'v-for') {
        // console.log(obj)
      } else {
      }
    }
    for (let i = 0; i < children.length; i++) {
      let result = _o(children[i])
      if (Array.isArray(result)) {
        result.forEach(item => {
          el.appendChild(item)
        })
      } else {
        result && el.appendChild(result)
      }
    }
    return [el]
  }
}

function toRender (obj) {
  if (obj && obj.children && obj.children[0]) {
    return _o(obj.children[0])
  } else {
    return
  }
}
export default toRender
