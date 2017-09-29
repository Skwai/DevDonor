import db from '@/services/firebase'
import { ADD_USER, UPDATE_USER } from '@/store/mutation-types'

export const getUser = async ({ state, commit }, key = state.uid) => {
  if (!state.users[key]) {
    const snapshot = await db.ref('users').child(key).once('value')
    commit(ADD_USER, snapshot)
  }
}

export const updateUser = async ({ commit }, { key, ...data }) => {
  const { snapshot } = await db.ref('users').child(key)
    .transaction((currData) => Object.assign({}, currData, data))
  commit(UPDATE_USER, snapshot)
}

export const getUserProjects = async ({ store, dispatch }, uid) => {
  const snapshot = await db.ref(`users/${uid}/projects`).once('value')
  await Promise.all((() => {
    const promises = []
    snapshot.forEach(({ key }) => dispatch('getProject', key))
    return promises
  })())
}
