
// 创建文本节点
const _t = (text) => {
  return document.createTextNode(text)
}
// 创建循环节点
const _l = (list = [], fn) => {
  let arr = []
  list.forEach((item, index) => {
    arr.push(fn(item, index))
  })
  return arr
}
// 创建节点
const _o = (obj) => {
  if (obj.type === 'component') {
    if (Vue.components[obj.tagName]) {
      return new Vue(Vue.components[obj.tagName]).$el
    } else {
      return _c(obj)
    }
  } else if (obj.type === 'node') {
    if (obj.options['v-for']) {
      return _l(obj.options['v-for'].list, function (item, index) {
        return _c(obj)
      })
    } else {
      return _c(obj)
    }
  } else if (obj.type === 'text') {
    return _t(obj.text)
  }
}

// 创建节点
const _c = ({tagName, options = {}, childrens = []}) => {
  let el = document.createElement(tagName)
  for (let k in options) { // staticClass, attrs
    if (k === 'attrs') {
      for (let j in options.attrs) {
        el.setAttribute(j, options.attrs[j])
      }
    } else if (k === 'staticClass') {
      el.setAttribute('class', options[k])
    } else {
    }
  }
  for (let i = 0; i < childrens.length; i++) {
    let result = _o(childrens[i])
    if (Array.isArray(result)) { // v-for
      result.forEach(elitem => {
        el.appendChild(elitem)
      })
    } else {
      el.appendChild(result)
    }
  }
  return el
}

function toRender (obj) {
  if (obj && obj.childrens && obj.childrens[0]) {
    return function () {
      return _o(obj.childrens[0])
    }
  } else {
    return function () {}
  }
}
export default toRender
