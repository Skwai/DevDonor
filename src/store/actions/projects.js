import db from '@/services/firebase'
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
