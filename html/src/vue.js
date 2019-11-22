import parseDomToObject from './util/toObj'
import objectToRender from './util/toRender'
import {trim} from './util/util'

class Vue {
  constructor ({template, data, methods, beforeCreate, created, beforeMount, mounted, beforeDestroy, destroyed}) {
    this.template = template
    this.data = data
    this.methods = methods
    // 生命周期
    this.beforeCreate = beforeCreate
    this.created = created
    this.beforeMount = beforeMount
    this.mounted = mounted
    this.beforeDestroy = beforeDestroy
    this.destroyed = destroyed
    this.$el = this.render()
  }

  $mount (name) {
    let oldNode = document.getElementById(name)
    oldNode.parentNode.replaceChild(this.$el, oldNode)
  }

  render () {
    let obj = parseDomToObject(this.template)
    let dom = objectToRender(obj)
    console.log(dom)
    return dom
  }

  static components = []

  static component (componentName, options) {
    let template = null
    if (options.template.indexOf('#') > -1) {
      template = document.getElementById(options.template.replace('#', '')).innerText
      template = trim(template)
    } else {
      template = options.template
    }

    this.components.push({
      componentName,
      obj: new Vue({ ...options, template })
    })
  }
}

window.Vue = Vue
