import * as types from './mutation-types'

export default {
  [types.LOGIN] (state, profile) {
    state.profile = profile
  },

  [types.LOGOUT] (state) {
    state.profile = null
  }
}
