import './vue'

Vue.component('com-li', {
  template: `
<li class="li" v-for="(item, index) in list" :key="index">
  <com-child :data="item" title="测试文本内容" @sub-event="subEvent"></com-child>
</li>
`,
  mounted () {
    // console.log(this)
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
      this.list.push('新添加内容')
      alert('点击事件一: ' + data)
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
      // console.log(this)
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
      name: '我是李鑫'
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
<div id="app" style="display: flex;">
  <div style="flex: 1; padding: 50px;">
    <input type="text" @input="changeEvent" v-model="lixin.name"/>
    <br /><br />
    <span style="margin-right: 10px">我来自{{from}}</span>
    <button @click="clickEvent">点击事件</button>
    <ul class="ul">
      <com-li></com-li>
    </ul>
    <com-area></com-area>
  </div>
  <div style="flex: 1;">
    <img src="../static/images/code.png" style="width: 100%" />
  </div>
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
      alert('点击事件二')
    }
  }
}).$mount('#app')
