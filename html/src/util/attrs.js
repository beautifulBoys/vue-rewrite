const {trim, splitKeyAndValue, getVForOptions} = require('./util')

exports.parseAttrs = (attrs) => {
  let options = {
    attrs: {}
  }
  // 遍历属性，拆分自定义属性及原生属性
  for (let i = 0; i < attrs.length; i++) {
    if (attrs[i].name === 'ref') {
      options[attrs[i].name] = attrs[i].value
    } else if (attrs[i].name === 'v-model') {
      options[attrs[i].name] = attrs[i].value
    } else if (attrs[i].name === 'v-for') {
      let info = getVForOptions(attrs[i].value)
      options[attrs[i].name] = {
        item: info.item,
        key: '',
        index: info.index,
        methods: info.methods,
        list: JSON.parse(info.list)
      }
    } else if (attrs[i].name.substring(0, 1) === ':') {
      options[attrs[i].name] = attrs[i].value
    } else {
      options.attrs[attrs[i].name] = attrs[i].value
    }
  }
  return options
}
