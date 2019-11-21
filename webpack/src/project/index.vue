<template>
  <div id="app" ref="app">
    <div>
      <input type="text" class="input" placeholder="请输入" value="李鑫"/>
      <label>我们的祖国</label>
      <ul class="ul">
        <li class="li" v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index">
          <div class="item">第{{index}}项： {{item}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    console.log('-----vue------')
    console.log(this.$refs.app)
  }
}
</script>


