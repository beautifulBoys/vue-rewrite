
export const _c = (tagName, options = {}, children = []) => {
  console.log(this)
  let el = null
  el = document.createElement(tagName)
  for (let k in options) {
    if (k === 'attrs') {
      for (let j in options.attrs) {
        el.setAttribute(j, options.attrs[j])
      }
    } else if (k === 'staticClass') {
      el.setAttribute('class', options[k])
    } else if (k === 'staticStyle') {
      el.setAttribute('style', options[k])
    } else if (k === 'v-if') {
    } else if (k === 'directives') {
      options[k].forEach(item => {
        if (item.key === 'v-model') {
          el.value = item.value
        }
      })
    } else if (k === 'on') {
      for (let onKey in options[k]) {
        let callback = options[k][onKey]
        el.addEventListener(onKey, callback)
      }
    } else if (k === 'ref') {
      // this.setRefs(options[k], el)
      this.$refs[options[k]] = el
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
  if (Vue.components[tagName]) {
    el = new Vue.VueComponent({
      ...Vue.components[tagName],
      parent: this
    }).$el
  }
  return el
}
