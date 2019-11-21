// require('../vue/util')
import {_t, _c, _l} from '../vue/util'
window._t = _t
window._c = _c
window._l = _l
require('./index.vue')

let oldNode = document.getElementById('app')
let newNode = render()

oldNode.parentNode.replaceChild(newNode, oldNode)