import * as types from './mutation-types'

export default {
  [types.LOGIN] (state, auth) {
    state.auth = auth
  },

  [types.LOGOUT] (state) {
    state.auth = null
  }
}
