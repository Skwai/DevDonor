import config from '@/config'
import * as types from './mutation-types'

export const login = ({ commit }, auth) => {
  localStorage.setItem(config.AUTH_STORAGE_KEY, auth)
  commit(types.LOGIN, auth)
}

export const logout = ({ commit }) => {
  localStorage.removeItem(config.AUTH_STORAGE_KEY)
  commit()
}
