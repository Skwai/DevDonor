import firebase from 'firebase'
import { Action, ActionContext } from 'vuex'

import Project from '../models/Project'
import * as auth from '../services/auth'
import db from '../services/db'
import State from './state'
import { SAVED_CREATE_PROJECT_FORM_DATA_KEY } from '../config'

const LOCALSTORAGE_WRITE_DEBOUNCE = 200 // ms

interface IActionContext extends ActionContext<State, any> {}

export const login = async ({ commit }: IActionContext): Promise<void> => {
  const userRecord = await auth.signIn()
  const userData = userRecord.user.toJSON()
  commit('SET_CURRENT_USER', userData)
}

export const loadCurrentUser = async ({ commit }: IActionContext): Promise<void> => {
  const userRecord = await auth.getCurrentUser()

  if (userRecord) {
    const userData = userRecord.toJSON()
    commit('SET_CURRENT_USER', userData)
  }
}

export const loadProjects = async ({ commit }: IActionContext): Promise<void> => {
  const querySnapshot = await db.collection('projects').get()
  querySnapshot.forEach((docSnapshot: firebase.firestore.DocumentSnapshot) => {
    const id = docSnapshot.id
    commit('ADD_PROJECT', { ...docSnapshot.data(), id })
  })
}

export const createProject = async ({ commit }: IActionContext, project: Project) => {
  const ref: firebase.firestore.DocumentReference = await db
    .collection('projects')
    .add({ ...project })
  const id = ref.id
  commit('ADD_PROJECT', { ...project, id })
}

export const loadProjectByID = async ({ commit, state }: IActionContext, projectID: string) => {
  // Check if project is already in store
  if (projectID in state.projects) {
    return
  }
  // Load project from Firestore
  const ref = db.collection('projects').doc(projectID)
  const doc = await ref.get()
  if (!doc.exists) {
    throw Error('Project does not exist')
  }
  const project = {
    ...doc.data(),
    id: doc.id
  }
  commit('ADD_PROJECT', project)
}

export const storeProjectFormData = ({ commit }: IActionContext, project: Project) => {
  const projectData = { ...project } // clone the Project object to prevent it mutating
  const pid = setTimeout(
    () => localStorage.setItem(SAVED_CREATE_PROJECT_FORM_DATA_KEY, JSON.stringify(projectData)),
    LOCALSTORAGE_WRITE_DEBOUNCE
  )
  commit('SET_SAVED_CREATE_PROJECT_FORM_DATA', projectData)
  commit('SET_SAVED_CREATE_PROJECT_FORM_DATA_WRITE_PID', pid)
}

export const clearProjectFormData = ({ commit }: IActionContext) => {
  commit('CLEAR_SAVED_CREATE_PROJECT_FORM_DATA')
  localStorage.removeItem(SAVED_CREATE_PROJECT_FORM_DATA_KEY)
}
