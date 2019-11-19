<template>
  <div id="app" ref="app">
    <div>
      <input type="text" class="input" placeholder="请输入" value="李鑫"/>
      <label>我们的祖国</label>
      <ul class="ul">
        <li class="li" v-for="(item, index) in list" :key="index">
          <div class="item">第{{index}}项： {{item}}</div>
        </li>
      </ul>
    </div>
    <div style="width: 200px;height: 200px;background: red;" draggable="true"></div>
    <div style="width: 200px;height: 200px;background: green;"></div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      list: [1, 2, 3, 4, 54, 5, 66, 77, 78, 8]
    }
  },
  mounted () {
    // console.log(this.$refs.app)
  }
}
</script>


