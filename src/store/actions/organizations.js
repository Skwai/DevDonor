import db, { skeleton } from '@/services/firebase'
import { ADD_ORGANIZATION } from '@/store/mutation-types'

export const getOrganization = async ({ state, commit }, key) => {
  if (!key) throw Error('key missing')
  if (!(key in state.organizations)) {
    const snapshot = await db.ref('organizations').child(key).once('value')
    commit(ADD_ORGANIZATION, snapshot)
  }
}

export const updateOrganization = async ({ state, commit, dispatch }, { key, ...newData }) => {
  if (!key) throw Error('key missing')
  const { snapshot } = await db.ref('organizations').child(key)
    .transaction((currData) => {
      const data = skeleton(currData, newData)
      data.users = data.users || {}
      if (!(state.uid in data.users)) {
        data.volunteers[state.uid] = true
      }
      return data
    })
  commit(ADD_ORGANIZATION, snapshot)
}
