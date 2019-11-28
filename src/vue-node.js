

export default class VNode {
  constructor ({options, parent, childrens}) {
    this.$options = options
    this.parent = parent
    this.childrens = childrens
    this.node = this.createNode(this.$options)
  }
  createNode () {
    el = document.createElement(tagName)
    for (let k in options) { // staticClass, attrs
      if (k === 'attrs') {
        for (let j in options.attrs) {
          el.setAttribute(j, options.attrs[j])
        }
      } else if (k === 'staticClass') {
        el.setAttribute('class', options[k])
      } else if (k === 'v-for') {
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
}

