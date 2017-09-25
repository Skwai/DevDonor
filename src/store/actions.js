import config from '@/config'

import * as types from './mutation-types'

import { signIn, signOut, getCurrentUser, db, auth } from '@/services/firebase'

const TOKEN_REFRESH_INTERVAL = 60 * 1 * 1000 // 10 minutes

/**
 * Trigger login
 */
export const login = async ({ commit, dispatch }) => {
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
    dispatch('authTokenRefresh')
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

/**
 * Refresh the current auth token
 */
export const authTokenRefresh = async ({ dispatch }) => {
  try {
    await auth().currentUser.getIdToken(true)
    setTimeout(() => dispatch(authTokenRefresh), TOKEN_REFRESH_INTERVAL)
  } catch (err) {
    console.log(err)
  }
}

/**
 *
 */
export const showNotification = async ({ commit, dispatch }, { message, type }) => {
  commit(types.ADD_NOTIFICATION, { message, type })
}

/**
 *
 */
export const removeNotification = async ({ commit }) => {
  commit(types.REMOVE_NOTIFICATION)
}

/**
 * Create a new user in Firebase
 */
export const tryCreateUser = async (context, { uid, ...data }) => {
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
export const getAuthStatus = async ({ commit, dispatch }) => {
  commit(types.AUTH_START)
  try {
    const user = await getCurrentUser()
    if (user) {
      commit(types.AUTH_SUCCESS, user.toJSON())
    }
    dispatch('authTokenRefresh')
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
