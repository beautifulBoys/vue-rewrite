
export const proxyData = (vm, key) => {
  Object.defineProperty(vm, key, {
    configurable: true,
    enumerable: true,
    get () {
      return vm._data[key]
    },
    set (val) {
      vm._data[key] = val
    }
  })
}
