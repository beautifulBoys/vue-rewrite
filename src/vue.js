import query from './vue/query'
import { _c, _l, _t } from './vue/vue-util'
import { proxyData } from './vue/common'

export default class Vue {
  constructor (options) {
    this.$options = options
    this.template = options.template
    this.mounted = options.mounted
    this.$el = null
    options.data && this.initData(options.data)
    options.methods && this.initMethods(options.methods)
  }

  $mount (name) {
    this.$render = this.createRenderFunction()
    let mount = document.getElementById(name.replace('#', ''))
    this.$el = this.$render(this)
    mount.appendChild(this.$el)
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

  _c = _c
  _l = _l
  _t = _t

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
