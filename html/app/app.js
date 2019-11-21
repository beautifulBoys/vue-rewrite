
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
      ]
		}
  },
  mounted () {
    console.log('初始化成功')
  }
})

Vue.component('ise-area-component', {
	template: '#ise-area',
	data: function () {
		return {
      text: ''
		}
  },
  mounted () {
    var _this = this
    setTimeout(function () {
      _this.text = '类似的会计分录可视对讲力口'
    }, 2000)
  }
})

new Vue({
  template: '<root-component></root-component>',
}).$mount('app')