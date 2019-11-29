const {trim, splitKeyAndValue, minifyHtml, getVForOptions} = require('./util')

function getVFor (attrs) {
  let info = null
  let newAttrs = {}
  for (let k in attrs) {
    if (k === 'v-for') {
      info = getVForOptions(attrs[k])
    } else {
      newAttrs[k] = attrs[k]
    }
  }
  return {info, attrs: newAttrs}
}

exports.parseAttrs = (attrs) => {
  let options = {
    attrs: {},
    directives: [],
    on: []
  }
  // 遍历属性，拆分自定义属性及原生属性
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    let name = attr.name
    let value = attr.value.replace(/ +/g, '').replace(/'/ig, '"')

    if (name === 'ref') {
      options[name] = value
    } else if (name.substr(0, 2) === 'v-') {
      if (name === 'v-for') {
        options[name] = getVForOptions(attr.value)
      } else if (name === 'v-if') {
        options[name] = value
      } else {
        options.directives.push({
          key: name,
          value: value
        })
      }
    } else if (name.charAt(0) === '@') {
      let data = {
        type: name.substr(1),
        fnName: value.replace(/\(.*\)$/g, ''),
        callback: value
      }
      options.on.push(data)
    } else if (name === 'class') {
      options['staticClass'] = value
    }  else if (name === ':class') {
      options['class'] = value
    } else if (name === 'style') {
      options['staticStyle'] = value
    } else if (name === ':style') {
      options['style'] = value
    } else {
      options.attrs[name] = value
    }
  }
  return options
}
