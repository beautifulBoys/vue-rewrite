
function render () {
  return _c('div', {'id': 'app','ref': 'app'}, [
    _c('div', {}, [
      _c('input', {'type': 'text'}, []), 
      _c('label', {}, [_t('我来自：{{countryName}}')]), 
      _c('ul', {'class': 'ul'}, [
        _l([1, 2, 3, 4, 45, 6], function (item, index) {
          return _c('li', {'class': 'li'}, [
            _c('div', {'class': 'item'}, [
              _t('第' + index + '项：' + item + '')
            ]), 
          ])
        })
      ])
    ])
  ])
}




_c("div", { "attrs": { "id": "app" }, "ref": "app" }, [
  _c("div", { "attrs": {} }, [
    _c("input", { "attrs": { "type": "text" } }, []),
    _t("我们的祖国"), 
    _c("ul", { "attrs": { "class": "ul" } }, [
      _l(1, 2, 3, 4, 5, 6, 7, function (item, index) {
        return _c("li", { "attrs": {}, "v-for": { "item": "item", "key": "", "index": "index", "methods": "in", "list": [1, 2, 3, 4, 5, 6, 7] }, ":key": "index" }, [
          _c("div", { "attrs": { "class": "item" } }, [
            _t("第{{index}}项：{{item}}号")
          ])
        ])
      })
    ])
  ])
])
