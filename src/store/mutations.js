import * as types from './mutation-types'

export default {
  [types.AUTH_START] (state) {
    state.authenticating = true
  },

  [types.AUTH_SUCCESS] (state, user) {
    console.log(user)
    state.currentUser = user
    state.authenticating = false
  },

  [types.AUTH_FAILED] (state) {
    state.authenticating = false
  },

  [types.LOGOUT] (state) {
    state.currentUser = null
    state.authenticating = false
  }
}
