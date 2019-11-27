function render () {
  return _c('div', {'id': 'app','ref': 'app'}, [
    _c('div', {}, [
      _c('input', {'type': 'text'}, []), 
      _c('label', {}, [_t('我们的祖国')]), 
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
