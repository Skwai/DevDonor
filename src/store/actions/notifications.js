import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '@/store/mutation-types'

export const showNotification = async ({ commit, dispatch }, { message, type }) => {
  commit(ADD_NOTIFICATION, { message, type })
}

export const removeNotification = async ({ commit }) => {
  commit(REMOVE_NOTIFICATION)
}

