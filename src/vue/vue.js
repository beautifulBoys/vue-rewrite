import VueComponent from './vue-component'
import Vnode from './vnode'
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
      el = new Vue.VueComponent({
        ...Vue.components[tagName],
        parent: this,
        props: options.props,
        on: options.on
      }).$el
    } else {
      el = new Vue.Vnode({
        type,
        tagName,
        options,
        children,
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
    return new Vue.Vnode({
      type: 'text',
      text,
      parent: this
    }).$el
  }

  _e (text = '') {
    return new Vue.Vnode({
      type: 'comment',
      text,
      parent: this
    }).$el
  }

  static Observer = Observer
  static VueComponent = VueComponent
  static Vnode = Vnode


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
