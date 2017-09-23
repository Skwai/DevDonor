import config from '@/config'

import * as types from './mutation-types'

import { signIn, signOut, getCurrentUser, db } from '@/services/firebase'

/**
 * Trigger login
 */
export const login = async ({ dispatch, commit }) => {
  commit(types.AUTH_START)
  try {
    const response = await signIn()
    const user = response.user.toJSON()
    const {
      uid,
      email,
      displayName: name,
      photoURL: picture
    } = user
    dispatch('setUID', uid)
    dispatch('tryCreateUser', {
      uid,
      email,
      name,
      picture
    })
    commit(types.AUTH_SUCCESS, user)
    commit(types.AUTH_COMPLETE)
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

/**
 *
 */
export const tryCreateUser = async (_, { uid, ...data }) => {
  const ref = db.ref('users').child(uid)
  ref.transaction((userData) => {
    if (userData === null) {
      return data
    }
  })
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

export const createRegistrationId = async({ commit }) => {
  try {
    const key = db.ref('applications').push().key
    localStorage.setItem(config.REGISTRATION_ID_KEY, key)
    commit(types.UPDATE_REGISTRATION_ID, key)
  } catch (err) {}
}

export const removeRegistrationId = async({ commit }) => {
  localStorage.removeItem(config.REGISTRATION_ID_KEY)
  commit(types.REMOVE_REGISTRATION_ID)
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
