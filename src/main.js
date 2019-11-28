
import Vue from './vue'
window.Vue = Vue

Vue.component('com-li', {
  template: `
<li class="li" v-for="(item, index) in list" :key="index">
  <div class="item">我是第{{index + 1}}项纪录：{{item}}</div>
</li>
`,
  mounted () {
  },
  data () {
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
  }
})

new Vue({
  template: `
<div class="app">
  <input type="text"/>
  我来自{{from}}
  <ul class="ul">
    <com-li></com-li>
  </ul>
</div>`,
  data () {
    return {
      from: '中国'
    }
  },
  mounted () {
    setTimeout(() => {
      this.from = '法国'
    }, 4000)
  }
}).$mount('#app')
