const parse5 = require('parse5')
const { parseAttrs } = require('./attrs')
import { minifyHtml } from './util'

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
function toObject (source) {
  let obj = parse5.parseFragment(source)
  return htmlParse(obj)
}

function stringifyOptions (options) {
  // 处理 @ 监听事件
  let onStr = ''
  options.on.forEach((item, index) => {
    let fnStr = item.callback.indexOf('(') > -1 ? item.callback : item.callback + '($event)'
    onStr += `${index ? ',' : ''}${JSON.stringify(item.type)}:function($event){${fnStr}}`
  })
  onStr = `{${onStr}}`
  options.on = '$ON'

  // 处理 v- 指令
  let directiveStr = ''
  options.directives.forEach((item, index) => {
    let $v = `{"key":"${item.key}","value":${item.value}}`
    directiveStr += `${index ? ',' : ''}${$v}`
  })
  directiveStr = `[${directiveStr}]`
  options.directives = '$DIRECTIVE'

  // 处理其他事件

  // 汇总区域
  let optionsStr = JSON.stringify(options)
  optionsStr = optionsStr.replace('"$ON"', onStr)
  optionsStr = optionsStr.replace('"$DIRECTIVE"', directiveStr)
  return optionsStr
}

function c ({tagName, options = {}, childrens = []}) {
  options = stringifyOptions(options)
  return `_c(${JSON.stringify(tagName)}, ${options}, [${children(childrens)}])`
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
    return c(obj)
  } else {
    console.log('其他类型，请检查')
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

function query (html) {
  html = minifyHtml(html)
  let obj = toObject(html)
  let fnStr = o(obj.childrens[0])
  // console.log(fnStr)
  return fnStr
}

export default query