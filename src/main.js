import './vue/vue'
// import query from './vue/query.js'

Vue.component('com-li', {
  template: `
<li class="li" v-for="(item, index) in list" :key="index">
  <com-div></com-div>
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


Vue.component('com-div', {
  template: `
  <div class="item">我是第李鑫</div>
`,
  mounted () {
  }
})


Vue.component('com-area', {
  template: `
<input type="text" class="input" 
  :class="['color', {active: true, disable: false}]" 
  placeholder="请输入" v-model="name" v-scroll="name"
  :style="{background: 'red'}" style="color: blue;outline: none"
  @change="changeEvent()" @click="submit(name)" @input="inputEvent"
  v-if="choice === 1" 
/>
`,
  mounted () {
    // console.log(this)
  },
  data () {
    return {
      name: '我是谁'
    }
  },
  methods: {
    changeEvent (e) {
      console.log(e)
    },
    submit (e) {
      console.log(e)
    },
    inputEvent (e) {
      console.log(e)
    }
  }
})

new Vue({
  template: `
<div id="app">
  <input type="text" @input="changeEvent"/>
  我来自{{from}}
  <button @click="clickEvent">点击事件</button>
  <ul class="ul">
    <com-li></com-li>
  </ul>
  <com-area></com-area>
</div>`,
  data () {
    return {
      from: '中国'
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    changeEvent (e) {
      console.log(e)
    },
    clickEvent (e) {
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