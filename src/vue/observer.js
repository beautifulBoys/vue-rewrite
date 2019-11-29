
export default class Observer {
  constructor (data) {
    this.data = data
    this.start()
  }
  start () {
    new Proxy(target, {
      get (target, key) {
        return target[key]
      },
      set (target, key, value) {
        target[key] = value
      }
    })
  }
}