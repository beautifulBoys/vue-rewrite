// import bindFunc from './bind.js'

function c ({tagName, options = {}, childrens = []}) {
  return `_c(${JSON.stringify(tagName)}, ${JSON.stringify(options)}, [${children(childrens)}])`
}

function t (text) {
  let str = JSON.stringify(text).replace(/\{\{([^\{\}]*)\}\}/ig, '" + ($1) + "')
  return `_t(${str})`
}

function o (obj) {
  if (obj.type === 'node') {
    if (obj.options['v-for']) {
      return l(obj)
    } else {
      return c(obj)
    }
  } else if (obj.type === 'text') {
    return t(obj.text)
  } else if (obj.type === 'component') {
    let component = new Vue(Vue.components[obj.tagName])
    return component._render
  }
}

function l (obj) {
  let vFor = obj.options['v-for']
  return `_l(${vFor.list}, function (${vFor.item}, ${vFor.index}) {return ${c(obj)}})`
}

function children (childrens) {
  let string = ''
  childrens.forEach(obj => {
    string += o(obj) + ','
  })
  return string.substr(0, string.length - 1)
}

export default function toRender (obj) {
  if (obj && obj.childrens && obj.childrens.length) {
    return o(obj.childrens[0])
  } else {
    return
  }
}
