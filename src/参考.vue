<template>
  <input type="text" class="input" 
    :class="['color', {active: true, disable: false}]" 
    placeholder="请输入" v-model="name" v-scroll="name"
    :style="{background: 'red', color: '#333'}" style="color: blue"
    @change="changeEvent()" @click="submit(name)" v-if="choice === 1" 
  />
</template>

<script>

function render () {
  var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.choice === 2) ? _c('input', {
    directives: [{
      "name": "model",
      "rawName": "v-model",
      "value": (_vm.name),
      "expression": "name"
    }, {
      "name": "scroll",
      "rawName": "v-scroll",
      "value": (_vm.name),
      "expression": "name"
    }],
    ref: "input",
    staticClass: "input",
    class: ['color', {
      "active": true,
      "disable": false
    }],
    staticStyle: {
      "color": "blue"
    },
    style: {
      "background": 'red'
    },
    attrs: {
      "type": "text",
      "placeholder": "请输入"
    },
    domProps: {
      "value": (_vm.name)
    },
    on: {"change":function($event){changeEvent()},
      "click": function($event) {
        _vm.submit()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.name = $event.target.value
      }
    }
  }) : (_vm.choice === 1) ? _c('label', {}) : _vm._e()
}

</script>
