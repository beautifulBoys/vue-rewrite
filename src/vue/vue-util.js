import VueComponent from '../vue-component'
// 创建列表
export const _l = (list, fn) => {
  let arr = []
  for (let i = 0; i < list.length; i++) {
    arr.push(fn(list[i], i))
  }
  return arr
}

// 创建文本节点
export const _t = (text) => {
  return document.createTextNode(text)
}

// 创建注释节点
export const _e = (text = '') => {
  return document.createComment(text)
}

// 创建元素节点
export const _c = (tagName, options = {}, children = []) => {
  let _this = this
  let el = null
  el = document.createElement(tagName)
  for (let k in options) {
    if (k === 'attrs') {
      for (let j in options.attrs) {
        el.setAttribute(j, options.attrs[j])
      }
    } else if (k === 'staticClass') {
      el.setAttribute('class', options[k])
    } else if (k === 'staticStyle') {
      el.setAttribute('style', options[k])
    } else if (k === 'v-if') {
    } else if (k === 'directives') {
    } else if (k === 'on') {
      for (let onKey in options[k]) {
        let callback = options[k][onKey]
        el.addEventListener(onKey, callback)
      }
    } else {
    }
  }
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      children[i].forEach(item => {
        el.appendChild(item)
      })
    } else {
      el.appendChild(children[i])
    }
  }
  if (Vue.components[tagName]) {
    el = new VueComponent({
      ...Vue.components[tagName],
      parent: _this
    }).$el
  }
  return el
}