import * as types from './mutation-types'

export default {
  [types.LOGIN] (state, auth, profile) {
    state.auth = auth
    state.profile = profile
  },

  [types.LOGOUT] (state) {
    state.auth = null
    state.profile = null
  }
}
