import './vue'

Vue.component('com-li', {
  template: `
<li class="li" v-for="(item, index) in list" :key="index">
  <com-child :data="item" title="中国陆军" @sub-event="subEvent"></com-child>
</li>
`,
  mounted () {
    console.log(this)
  },
  data () {
    return {
      list: [
        '第一行',
        '第二行',
        '第三行',
        '第四行',
        '第五行',
        '第六行',
        '第七行',
        '第八行',
        '第九行'
      ]
    }
  },
  methods: {
    subEvent (data) {
      console.log(data)
      this.list.push('解放军第十军')
    }
  }
})


Vue.component('com-child', {
  template: `
  <div class="item" @click="event">{{title}}:{{data}}</div>
`,
  mounted () {
    // console.log(this)
  },
  data () {
    return {
    }
  },
  methods: {
    event () {
      console.log(this)
      this.$emit('sub-event', this.data)
    }
  }
})


Vue.component('com-area', {
  template: `
<input
  type="text"
  class="input"
  :class="['color', {active: true, disable: false}]"
  placeholder="请输入"
  v-model="name"
  v-scroll="name"
  :style="{background: 'red'}"
  style="color:blue;outline:none"
  @change="changeEvent()"
  @click="submit(name)"
  @input="inputEvent"
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
  <input type="text" @input="changeEvent" v-model="lixin.name"/>
  我来自{{from}}
  <button @click="clickEvent">点击事件</button>
  <ul class="ul">
    <com-li></com-li>
  </ul>
  <com-area></com-area>
</div>`,
  data () {
    return {
      from: '中国',
      lixin: {
        name: '李鑫',
        age: 26
      }
    }
  },
  mounted () {
    // console.log(this)
  },
  methods: {
    changeEvent (e) {
      console.log(e.target.value)
    },
    clickEvent (e) {
      console.log(e)
    }
  }
}).$mount('#app')
