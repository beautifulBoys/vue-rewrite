// 创建列表
export const _l = (list, fn) => {
  let arr = []
  for (let i = 0; i < list.length; i++) {
    arr.push(fn(list[i], i))
  }
  return arr
}

// 创建文本节点
export const _t = (text) => {
  return document.createTextNode(text)
}

// 创建节点
export const _c = (tagname, options = {}, children = []) => {
  let el = document.createElement(tagname)
  for (let k in options) { // staticClass, attrs
    if (k === 'attrs') {
      for (let j in options.attrs) {
        el.setAttribute(j, options.attrs[j])
      }
    } else if (k === 'staticClass') {
      el.setAttribute('class', options[k])
    } else if (k === 'v-for') {
      // el.appendChild(_t('-----------------'))
    } else {
      // console.log(k, options[k])
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
  return el
}

