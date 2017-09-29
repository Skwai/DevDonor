import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '@/store/mutation-types'

export const errorNotification = ({ dispatch }, message) => {
  dispatch('showNotification', {
    message,
    type: 'error'
  })
}

export const successNotification = ({ dispatch }, message) => {
  dispatch('showNotification', {
    message,
    type: 'success'
  })
}

export const showNotification = ({ commit }, { message, type }) => commit(ADD_NOTIFICATION, { message, type })

export const removeNotification = ({ commit }) => {
  commit(REMOVE_NOTIFICATION)
}

