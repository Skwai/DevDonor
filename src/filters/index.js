import * as stringFilters from './string'

export default {
  install (Vue) {
    Object.keys(stringFilters)
      .forEach((name) => Vue.filter(name, stringFilters[name]))
  }
}
