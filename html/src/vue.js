import parseDomToObject from './util/toObj'
import {toRender} from './util/toRender'
import {_l, _t, _c} from './vue-util'
import {minifyHtml} from './util/util'
function proxy (vm, key) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return vm._data[key]
      },
      set: function proxySetter (val) {
        vm._data[key] = val
      }
    })
}
class Vue {
  constructor ({
    template = '',
    data,
    methods = {},
    beforeCreate,
    created,
    beforeMount,
    mounted,
    beforeDestroy,
    destroyed,
    parent,
    childrens
  }) {
    this.template = template
    this._data = data ? data.call(this) : {}
    this.methods = methods
    // 生命周期
    this.beforeCreate = beforeCreate
    this.created = created
    this.beforeMount = beforeMount
    this.mounted = mounted
    this.beforeDestroy = beforeDestroy
    this.destroyed = destroyed
    this.parent = parent
    this.childrens = childrens
    this._render = this.query(this.template)
    this.initData()
  }

  initData () {
    for (let k in this._data) {
      proxy(this, k)
    }
  }

  $mount (name) {
    this.$render = new Function('vm', `with(vm){console.log(vm);return ${this._render}}`)
    this.$el = this.$render(this)
    let mount = document.getElementById(name)
    mount.parentNode.replaceChild(this.$el, mount)
  }

  lifeCycle () {
    this.beforeCreate()
    this.created()
    this.beforeMount()
    this.mounted()
    this.beforeDestroy()
    this.destroyed()
  }

  query (template) {
    let obj = parseDomToObject(template)
    return toRender(obj)
  }

  _l = _l
  _c = _c
  _t = _t
  
  static components = {}

  static component (componentName, options) {
    let template = null
    if (options.template.charAt(0) === '#') {
      template = document.getElementById(options.template.substr(1)).innerText
      template = minifyHtml(template)
    } else {
      template = minifyHtml(options.template)
    }

    this.components[componentName] = {
      ...options,
      template
    }
  }
}

window.Vue = Vue
