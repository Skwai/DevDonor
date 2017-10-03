import db, { skeleton } from '@/services/firebase'
import { ADD_PROJECT } from '@/store/mutation-types'

const PROJECTS_PER_PAGE = 30

export const getProjects = async ({ commit }) => {
  const snapshot = await db.ref('projects').limitToFirst(PROJECTS_PER_PAGE).once('value')
  snapshot.forEach((s) => commit(ADD_PROJECT, s))
}

export const getProject = async ({ state, commit }, key) => {
  if (!(key in state.projects)) {
    const snapshot = await db.ref(`projects/${key}`).once('value')
    commit(ADD_PROJECT, snapshot)
  }
}

export const updateProject = async ({ state, dispatch, commit }, { key, ...newData }) => {
  if (!key) throw Error('key missing')
  const { snapshot } = await db.ref('projects').child(key)
    .transaction((currData) => {
      const data = skeleton(currData, newData)
      data.volunteers = data.volunteers instanceof Object ? data.volunteers : {}
      if (!(state.uid in data.volunteers)) {
        data.volunteers[state.uid] = true
      }
      return data
    })
  commit(ADD_PROJECT, snapshot)
  await dispatch('addProjectToUser', snapshot.key)
}
