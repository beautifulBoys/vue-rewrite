export default class Vnode {
  tagName = ''
  type = 'node'
  options = null
  children = []
  parent = null
  $el = null
  value = null
  text = ''
  constructor ({type = 'node', tagName, attrs = [], text, options = {}, parent = {}, children = []}) {
    this.type = type
    this.text = text
    this.tagName = tagName
    this.options = options
    this.parent = parent
    this.children = children
    if (this.type === 'node') {
      this.createElement()
    } else if (this.type === 'text') {
      this.createTextNode()
    } else if (this.type === 'comment') {
      this.createComment()
    }
    
  }

  createTextNode () {
    this.$el = document.createTextNode(this.text)
  }

  createComment () {
    this.$el = document.createComment(this.text)
  }

  createElement () {
    this.$el = document.createElement(this.tagName)
    for (let k in this.options) {
      if (k === 'attrs') {
        for (let j in this.options.attrs) {
          this.$el.setAttribute(j, this.options.attrs[j])
        }
      } else if (k === 'staticClass') {
        this.$el.setAttribute('class', this.options[k])
      } else if (k === 'staticStyle') {
        this.$el.setAttribute('style', this.options[k])
      } else if (k === 'v-if') {
      } else if (k === 'directives') {
        this.options[k].forEach(item => {
          if (item.key === 'v-model') {
            this.$el.value = item.value
          }
        })
      } else if (k === 'on') {
        for (let onKey in this.options[k]) {
          let callback = this.options[k][onKey]
          this.$el.addEventListener(onKey, callback)
        }
      } else if (k === 'ref') {
        this.parent.$refs[this.options[k]] = this.$el
      } else {
      }
    }
    for (let i = 0; i < this.children.length; i++) {
      if (Array.isArray(this.children[i])) {
        this.children[i].forEach(item => {
          this.$el.appendChild(item)
        })
      } else {
        this.$el.appendChild(this.children[i])
      }
    }
  }

  update () {
    
  }

  setAttribute () {

  }
}