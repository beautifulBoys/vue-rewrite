
function list (arr = []) {
  let string = ''
  arr.forEach(item => {
    if (item.type === 'text') {
      string += t(item) + ','
    } else if (item.type === 'node') {
      string += c(item) + ','
    } else {}
  })
  return string.substr(0, string.length - 1)
}

function toRender (obj) {
  console.log(obj)
  let string = ''
  if (obj.type === 'node') {
    string += `window.render = function render () {return ${c(obj)}};`
  }
  return string
}

function c (obj) {
  let string = `_c(${JSON.stringify(obj.tagName)}, ${JSON.stringify(obj.options)}, [${list(obj.children)}])`
  if (obj.options['v-for']) {
    string = `_l(${obj.options['v-for'].listName}, function ${obj.options['v-for'].itemName} {return ${string}})`
  }
  return string
}

function t (obj) {
  return `_t(${JSON.stringify(obj.text)})`
}

function l (obj) {
  return `_l(${obj.listName}, function (item, index) {return ${list()}})`
}

// toRender.call(window)

module.exports = toRender
