import * as types from './mutation-types'

export default {
  [types.AUTH_START] (state) {
    state.authenticating = true
  },

  [types.AUTH_SUCCESS] (state, auth) {
    state.auth = auth
  },

  [types.UPDATE_UID] (state, uid) {
    state.uid = uid
  },

  [types.REMOVE_UID] (state) {
    state.uid = null
  },

  [types.AUTH_FAILED] (state) {
    state.authenticating = false
  },

  [types.AUTH_COMPLETE] (state) {
    state.authenticating = false
  },

  [types.LOGOUT] (state) {
    state.auth = null
    state.authenticating = false
  },

  [types.ADD_NOTIFICATION] (state, { message, type }) {
    state.notification = { message, type }
  },

  [types.REMOVE_NOTIFICATION] (state) {
    state.notification = null
  },

  [types.SHOW_SIGNUP_SPLASH] (state) {
    state.showSignupSplash = true
  },

  [types.HIDE_SIGNUP_SPLASH] (state) {
    state.showSignupSplash = false
  }
}
