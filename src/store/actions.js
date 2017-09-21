import * as types from './mutation-types'

import { signIn, signOut, currentUser, fb, db } from '@/services/firebase'

/**
 * Trigger login
 */
export const login = async ({ dispatch, commit }) => {
  commit(types.AUTH_START)
  try {
    const response = await signIn()
    const user = response.user.toJSON()
    dispatch('updateUserFromAuth', user)
    const result = commit(types.AUTH_SUCCESS, user)
    console.log(result)
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

export const updateUserFromAuth = async ({ commit }, { uid, email, displayName, photoURL }) => {
  return db.ref(`users/${uid}`).set({
    email,
    displayName,
    photoURL
  })
}

/**
 * Set a user's current auth state
 */
export const auth = async ({ commit }) => {
  commit(types.AUTH_START)
  try {
    const user = await new Promise((resolve, reject) => {
      if (currentUser()) {
        resolve(currentUser())
      } else {
        fb.auth().onAuthStateChanged((u) => u ? resolve(u) : reject('Not signed in'))
      }
    })
    if (user) {
      commit(types.AUTH_SUCCESS, user.toJSON())
    } else {
      throw Error('Not signed in')
    }
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

/**
 * Destroy a user's session
 */
export const logout = ({ commit }) => {
  commit(types.AUTH_START)
  try {
    signOut()
    commit(types.LOGOUT)
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}
