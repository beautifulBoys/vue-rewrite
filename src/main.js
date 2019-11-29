import './vue'
// import query from './vue/query.js'

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
  <input type="text" />
  我来自{{from}}
  <button @click="clickEvent">点击事件</button>
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
  },
  methods: {
    clickEvent (e) {
      console.log('input 改变了: ')
      console.log(e)
    } 
  }
}).$mount('#app')

// let str = `
// <input type="text" class="input" 
//   :class="['color', {active: true, disable: false}]" 
//   placeholder="请输入" v-model="name" v-scroll="name"
//   :style="{background: 'red'}" style="color: blue"
//   @change="changeEvent()" @click="submit(name, index)" @input="inputEvent"
//   v-if="choice === 1" 
// />
// `
// console.log(query(str))