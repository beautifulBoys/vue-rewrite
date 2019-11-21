class Vue {
  constructor ({template, data, methods, beforeCreate, created, beforeMount, mounted, beforeDestroy, destroyed}) {
    this.template = template
    this.data = data
    this.components = []
    this.methods = methods
    // 生命周期
    this.beforeCreate = beforeCreate
    this.created = created
    this.beforeMount = beforeMount
    this.mounted = mounted
    this.beforeDestroy = beforeDestroy
    this.destroyed = destroyed
    this.$el = null
  }

  $mount (name) {
    let oldNode = document.getElementById(name)
    oldNode.parentNode.replaceChild(this.$el, oldNode)
  }

  render () {

  }
}

Vue.component = (componentName, options) => {
  let template = options.template.indexOf('#') > -1 
  ? document.getElementById(options.template).childNodes[0]
  : options.template

  Vue.components.push({
    componentName,
    obj: new Vue({ ...options, template })
  })
}

window.Vue = Vue
