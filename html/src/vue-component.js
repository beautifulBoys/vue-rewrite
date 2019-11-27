import Vue from './vue'

class VueComponent extends Vue {
  constructor ({template, data, methods, beforeCreate, created, beforeMount, mounted, beforeDestroy, destroyed}) {
    this.$template = template
    this.data = data
    this.methods = methods
    // 生命周期
    this.beforeCreate = beforeCreate
    this.created = created
    this.beforeMount = beforeMount
    this.mounted = mounted
    this.beforeDestroy = beforeDestroy
    this.destroyed = destroyed
    this._render = this.toRender()
  }

  $mount (name) {
    let oldNode = document.getElementById(name)
    // oldNode.parentNode.replaceChild(this.$el, oldNode)
  }

  toRender () {
    let obj = parseDomToObject(this.template)
    return objectToRender(obj)
  }

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
    // console.log(this.components[componentName])
  }
}