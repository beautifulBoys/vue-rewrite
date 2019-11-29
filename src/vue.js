import VueComponent from './vue-component'
import query from './vue/query'
import { proxyData } from './vue/common'

export default class Vue {
  $el = null
  $refs = {}
  constructor (options) {
    this.$options = options
    this.template = options.template
    this.mounted = options.mounted
    options.data && this.initData(options.data)
    options.methods && this.initMethods(options.methods)
  }

  $mount (name) {
    this.$render = this.createRenderFunction()
    let mount = document.getElementById(name.replace('#', ''))
    this.$el = this.$render(this)
    mount.parentNode.replaceChild(this.$el, mount)
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
    // console.log(this)
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
        // this.setRefs(options[k], el)
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

  static VueComponent = VueComponent

  static components = {}

  static component (componentName, options) {
    let template = null
    if (options.template.charAt(0) === '#') {
      template = document.getElementById(options.template.substr(1)).innerText
      template = template
    } else {
      template = options.template
    }

    this.components[componentName] = {
      ...options,
      template
    }
  }
}

window.Vue = Vue
