
export default class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
  }

  walk (obj) {
    var value
    for (var key in obj) {
      // 通过 hasOwnProperty 过滤掉一个对象本身拥有的属性 
      if (obj.hasOwnProperty(key)) {
        value = obj[key]
        // 递归调用 循环所有对象出来
        if (typeof value === 'object') {
          new Observer(value)
        }
        this.convert(key, value)
      }
    }
  }

  convert (key, value) {
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get () {
        // console.log('读取：' + key)
        return value
      },
      set (newVal) {
        // console.log('赋值：' + key)
        if (newVal !== value) value = newVal
      }
    })
  }

}
