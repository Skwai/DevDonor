import * as types from './mutation-types'

import { toObject } from '@/services/firebase'

const mutations = {
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

  [types.ADD_PROJECT] (state, snapshot) {
    state.projects[snapshot.key] = toObject(snapshot)
  },

  [types.ADD_USER] (state, snapshot) {
    state.users[snapshot.key] = toObject(snapshot)
  },

  [types.UPDATE_USER] (state, snapshot) {
    state.users[snapshot.key] = toObject(snapshot)
  },

  [types.ADD_COUNTRIES] (state, snapshot) {
    state.countries = snapshot.val()
  },

  [types.ADD_SKILLS] (state, snapshot) {
    state.skills = snapshot.val()
  },

  [types.ADD_ORGANIZATION] (state, snapshot) {
    state.organizations[snapshot.key] = toObject(snapshot)
  }
}

export default mutations
