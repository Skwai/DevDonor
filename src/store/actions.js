import config from '@/config'

import * as types from './mutation-types'

import { signIn, signOut, getCurrentUser, db, auth } from '@/services/firebase'

const TOKEN_REFRESH_INTERVAL = 60 * 1000 * 10 // 10 minutes

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
    dispatch('showSignupSplash')
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

export const authTokenRefresh = async ({ dispatch }) => {
  setTimeout(async () => {
    try {
      await auth().currentUser.getIdToken(true)
      dispatch('authTokenRefresh')
    } catch (err) {
      console.error(err)
    }
  }, TOKEN_REFRESH_INTERVAL)
}

export const showNotification = async ({ commit, dispatch }, { message, type }) => {
  commit(types.ADD_NOTIFICATION, { message, type })
}

export const removeNotification = async ({ commit }) => {
  commit(types.REMOVE_NOTIFICATION)
}

export const tryCreateUser = async (context, { uid, ...data }) => {
  const ref = db.ref('users').child(uid)
  ref.transaction((userData) => {
    if (userData === null) {
      return data
    }
  })
}

export const setUID = async ({ commit }, uid) => {
  localStorage.setItem(config.USER_ID_KEY, uid)
  commit(types.UPDATE_UID, uid)
}

export const removeUID = async ({ commit }) => {
  localStorage.removeItem(config.USER_ID_KEY)
  commit(types.REMOVE_UID)
}

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

export const showSignupSplash = async ({ commit }) => {
  commit(types.SHOW_SIGNUP_SPLASH)
}

export const hideSignupSplash = async ({ commit }) => {
  localStorage.setItem(config.SPLASH_SEEN_KEY, true)
  commit(types.HIDE_SIGNUP_SPLASH)
}

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
