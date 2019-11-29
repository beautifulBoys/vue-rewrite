
import query from './vue/query'
import {_c, _l, _t} from './vue/vue-util'
import { proxyData } from './vue/common'

export default class VueComponent {
  constructor (options) {
    this.$options = options
    this.template = options.template
    this.mounted = options.mounted
    this.$parent = options.parent
    this.$el = null
    this.$render = this.createRenderFunction()
    options.data && this.initData(options.data)
    options.methods && this.initMethods(options.methods)
    this.$mount()
  }

  $mount () {
    this.$el = this.$render(this)
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

}
window.VueComponent = VueComponent
