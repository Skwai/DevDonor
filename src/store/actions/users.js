import db, { skeleton } from '@/services/firebase'
import { ADD_USER, UPDATE_USER } from '@/store/mutation-types'

export const getUser = async ({ state, commit }, uid) => {
  if (!state.users[uid]) {
    const snapshot = await db.ref('users').child(uid).once('value')
    commit(ADD_USER, snapshot)
  }
}

export const createUser = async ({ commit }, { uid, ...newData }) => {
  const ref = db.ref('users').child(uid)
  const { snapshot } = await ref.transaction((currData) => skeleton(currData, newData))
  commit(ADD_USER, snapshot)
}

export const updateUser = async ({ commit }, { key, ...newData }) => {
  const { snapshot } = await db.ref('users').child(key)
    .transaction((currData) => Object.assign({}, currData, newData))
  commit(UPDATE_USER, snapshot)
}

export const getUserOrganizations = async ({ store, dispatch }, uid) => {
  const snapshot = await db.ref(`users/${uid}/organizations`).once('value')
  await Promise.all((() => {
    const promises = []
    snapshot.forEach(({ key }) => dispatch('getOrganization', key))
    return promises
  })())
}

export const getUserProjects = async ({ dispatch }, uid) => {
  const snapshot = await db.ref(`users/${uid}/projects`).once('value')
  await Promise.all((() => {
    const promises = []
    snapshot.forEach(({ key }) => dispatch('getProject', key))
    return promises
  })())
}
