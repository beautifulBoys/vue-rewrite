
import query from './vue/query'
import { proxyData } from './vue/common'

export default class VueComponent {
  $el = null
  $refs = {}
  constructor (options) {
    this.$options = options
    this.template = options.template
    this.mounted = options.mounted
    this.$parent = options.parent
    this.$render = this.createRenderFunction()
    options.data && this.initData(options.data)
    options.methods && this.initMethods(options.methods)
    this.$el = this.$render(this)
    this.$mount()
  }

  $mount () {
    this._init()
  }
  
  _init () {
    this.mounted && this.mounted()
  }

  initData (data) {
    this._data = data()
    Object.keys(this._data).forEach(key => {
      proxyData(this, key)
    })
  }

  initMethods (methods) {
    for (let k in methods) {
      this[k] = methods[k]
    }
  }

  createRenderFunction () {
    let _render = query(this.template)
    return new Function('vm', `with(vm){return ${_render}}`)
  }
  _c (tagName, options = {}, children = []) {
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
      } else if (k === 'ref') {
        this.$refs[options[k]] = el
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
      el = new Vue.VueComponent({
        ...Vue.components[tagName],
        parent: this
      }).$el
    }
    return el
  }
  _l (list, fn) {
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(fn(list[i], i))
    }
    return arr
  }
  _t (text) {
    return document.createTextNode(text)
  }
  _e (text = '') {
    return document.createComment(text)
  }

}
// window.VueComponent = VueComponent
