import Vue from './vue'

class VueComponent extends Vue {
  constructor (options) {
    super(options)
    this._render = this.toRender()
  }

  $mount (el) {
    this.
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