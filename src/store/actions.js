import config from '@/config'
import * as types from './mutation-types'

export const login = ({ commit }, profile) => {
  localStorage.setItem(config.PROFILE_STORAGE_KEY, JSON.stringify(profile))
  commit(types.LOGIN, profile)
}

export const logout = ({ commit }) => {
  localStorage.removeItem(config.PROFILE_STORAGE_KEY)
  commit(types.LOGIN)
}
