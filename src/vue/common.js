
export const proxyData = (vm, key, type) => {
  Object.defineProperty(vm, key, {
    configurable: true,
    enumerable: true,
    get () {
      return vm['_' + type][key]
    },
    set (val) {
      vm['_' + type][key] = val
    }
  })
}
