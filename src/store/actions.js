import * as types from './mutation-types'

import { signIn, signOut, currentUser, fb } from '@/services/firebase'

export const login = async ({ commit }) => {
  commit(types.AUTH_START)
  try {
    const response = await signIn()
    const user = response.user.toJSON()
    commit(types.AUTH_SUCCESS, user)
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

export const auth = async ({ commit }) => {
  commit(types.AUTH_START)
  try {
    const user = await new Promise((resolve, reject) => {
      if (currentUser()) {
        return resolve(currentUser())
      }

      fb.auth().onAuthStateChanged((u) => u ? resolve(u) : reject(null))
    })
    console.log(user)
    if (user) {
      commit(types.AUTH_SUCCESS, user.toJSON())
    } else {
      throw Error(null)
    }
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
}

export const logout = ({ commit }) => {
  commit(types.AUTH_START)
  try {
    signOut()
    commit(types.LOGOUT)
  } catch (err) {}
}
