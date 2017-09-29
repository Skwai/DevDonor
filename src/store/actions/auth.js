import config from '@/config'
import * as types from '@/store/mutation-types'
import { signIn, signOut, getCurrentUser, currentUser } from '@/services/firebase'

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
    dispatch('createUser', {
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

export const authTokenRefresh = async ({ dispatch }) => {
  setTimeout(async () => {
    try {
      await currentUser.getIdToken(true)
      dispatch('authTokenRefresh')
    } catch (err) {}
  }, TOKEN_REFRESH_INTERVAL)
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
      dispatch('getUser', user.uid)
    }
    dispatch('authTokenRefresh')
    commit(types.AUTH_COMPLETE)
  } catch (err) {
    commit(types.AUTH_FAILED)
  }
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
