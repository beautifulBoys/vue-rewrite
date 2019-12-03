import VueComponent from './vue-component'
import Observer from './observer'
import query from './query'
import { proxyData } from './common'

export default class Vue {
  $el = null
  $refs = {}
  constructor (options) {
    this.$options = options
    this.template = options.template
    this.mounted = options.mounted
    options.props && this.initProps(options.props)
    options.data && this.initData(options.data)
    options.methods && this.initMethods(options.methods)
    if (options.on) this._on = options.on
  }

  $mount (name) {
    this._render = this.createRenderFunction()
    let mount = document.getElementById(name.replace('#', ''))
    this.$el = this._render(this)
    mount.parentNode.replaceChild(this.$el, mount)
    this._init()
  }

  $emit () {
    let onFn = this._on[arguments[0]]
    if (onFn) {
      onFn.apply(onFn, [...arguments].splice(1))
    }
  }

  _init () {
    this.mounted && this.mounted()
  }

  initData (data) {
    this._data = new Vue.Observer(data()).data
    Object.keys(this._data).forEach(key => {
      proxyData(this, key, 'data')
    })
  }

  initProps (data) {
    this._props = new Vue.Observer(data).data
    Object.keys(this._props).forEach(key => {
      proxyData(this, key, 'props')
    })
  }

  initMethods (methods) {
    this._methods = methods
    Object.keys(this._methods).forEach(key => {
      proxyData(this, key, 'methods')
    })
  }

  createRenderFunction () {
    let _render = query(this.template)
    return new Function('vm', `with(vm){return ${_render}}`)
  }

  _c (tagName, type, options = {}, children = []) {
    let el = null
    if (type === 'component' && Vue.components[tagName]) {
        let props = {}
        for (let k in options.props) {
          props[k] = options.props[k]
        }
        el = new Vue.VueComponent({
          ...Vue.components[tagName],
          parent: this,
          props,
          on: options.on
        }).$el
    } else {
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
          options[k].forEach(item => {
            if (item.key === 'v-model') {
              el.value = item.value
            }
          })
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

  static Observer = Observer
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
