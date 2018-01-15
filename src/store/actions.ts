import { ActionContext, ActionTree, Action } from 'vuex'
import State from './state'
import * as auth from '@/services/auth'
import db from '@/services/db'
import Project from '@/models/Project'

export const login = async ({ commit }: ActionContext<State, any>): Promise<void> => {
  const userRecord = await auth.signIn()
  const userData = userRecord.user.toJSON()
  commit('SET_CURRENT_USER', userData)
}

export const getCurrentUser = async ({ commit }: ActionContext<State, any>): Promise<void> => {
  const userRecord = await auth.getCurrentUser()

  if (userRecord) {
    const userData = userRecord.toJSON()
    commit('SET_CURRENT_USER', userData)
  }
}

export const getProjects = async ({ commit }: ActionContext<State, any>): Promise<void> => {
  const querySnapshot = await db.collection('projects').get()
  querySnapshot.forEach((docSnapshot: firebase.firestore.DocumentSnapshot) => {
    const id = docSnapshot.id
    commit('ADD_PROJECT', { ...docSnapshot.data(), id })
  })
}

export const createProject = async ({ commit }: ActionContext<State, any>, project: Project) => {
  const docRef: firebase.firestore.DocumentReference = await db.collection('projects').add({ ...project })
  const id = docRef.id
  commit('ADD_PROJECT', { ...project, id })
}
