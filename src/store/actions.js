import config from '@/config'

import * as types from './mutation-types'

import { signIn, signOut, getCurrentUser } from '@/services/firebase'

/**
 * Trigger login
 */
export const login = async ({ dispatch, commit }) => {
  commit(types.AUTH_START)
  try {
    const response = await signIn()
    const user = response.user.toJSON()
    dispatch('setUID', user.uid)
    commit(types.AUTH_COMPLETE)
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

/**
 * Add the UID to localStorage and store
 * @param {String} uid
 */
export const setUID = async ({ commit }, uid) => {
  localStorage.setItem(config.USER_ID_KEY, uid)
  commit(types.UPDATE_UID, uid)
}

/**
 * Remove the UID from localStorage and store
 */
export const removeUID = async ({ commit }) => {
  localStorage.removeItem(config.USER_ID_KEY)
  commit(types.REMOVE_UID)
}

/**
 * Set a user's current auth state
 */
export const getAuthStatus = async ({ commit }) => {
  commit(types.AUTH_START)
  try {
    const user = await getCurrentUser()
    if (user) {
      commit(types.AUTH_SUCCESS, user.toJSON())
    }
    commit(types.AUTH_COMPLETE)
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

/**
 * Destroy a user's session
 */
export const logout = ({ commit, dispatch }) => {
  commit(types.AUTH_START)
  try {
    signOut()
    dispatch('removeUID')
    commit(types.LOGOUT)
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}
