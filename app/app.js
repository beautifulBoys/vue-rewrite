console.time('vue')
Vue.component('root-component', {
	template: '#root'
})

Vue.component('ise-ul-component', {
	template: '#ise-ul',
	data: function () {
		return {
      list: [
        '解放军第一军',
        '解放军第二军',
        '解放军第三军',
        '解放军第四军',
        '解放军第五军',
        '解放军第六军',
        '解放军第七军',
        '解放军第八军',
        '解放军第九军'
      ],
      country: '中国'
		}
  },
  mounted () {
  }
})

Vue.component('ise-area-component', {
	template: '#ise-area',
	data: function () {
		return {
      text: '我是李鑫'
		}
  },
  mounted () {
    var _this = this
    setTimeout(function () {
      _this.text = '我是李欣欣'
      console.log(_this.$parent.$el)
    }, 2000)
  }
})

const app = new Vue({
  template: '<root-component></root-component>',
}).$mount('app')

window.lixin = app
console.timeEnd('vue')
