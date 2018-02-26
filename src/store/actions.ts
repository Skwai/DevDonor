import firebase from 'firebase'
import { Action, ActionContext } from 'vuex'

import Project from '../models/Project'
import * as auth from '../services/auth'
import db from '../services/db'
import State from './state'
import { SAVED_CREATE_PROJECT_FORM_DATA_KEY } from '../config'
import * as types from './types'

const LOCALSTORAGE_WRITE_DEBOUNCE = 200 // ms

interface IActionContext extends ActionContext<State, any> {}

export const login = async ({ commit }: IActionContext, provider: string): Promise<void> => {
  commit(types.SET_PENDING_AUTH)
  commit(types.REMOVE_NOTIFICATION)
  try {
    const userRecord = await auth.signIn(provider)
    const userData = userRecord.user.toJSON()
    commit(types.SET_CURRENT_USER, userData)
  } catch (err) {
    if (err.message) {
      commit(types.SET_ERROR_NOTIFICATION, err.message)
    }
    throw err
  } finally {
    commit(types.RESET_PENDING_AUTH)
  }
}

export const logout = ({ commit }: IActionContext) => {
  auth.signOut()
  commit(types.REMOVE_CURRENT_USER)
}

export const loadCurrentUser = async ({ commit }: IActionContext): Promise<void> => {
  commit(types.SET_PENDING_AUTH)
  try {
    const userRecord = await auth.getCurrentUser()
    if (userRecord) {
      const userData = userRecord.toJSON()
      commit(types.SET_CURRENT_USER, userData)
    }
  } catch (err) {
  } finally {
    commit(types.RESET_PENDING_AUTH)
  }
}

export const loadProjects = async ({ commit }: IActionContext): Promise<void> => {
  const querySnapshot = await db.collection('projects').get()
  querySnapshot.forEach((docSnapshot: firebase.firestore.DocumentSnapshot) => {
    const id = docSnapshot.id
    commit(types.ADD_PROJECT, { ...docSnapshot.data(), id })
  })
}

export const createProject = async ({ commit }: IActionContext, project: Project) => {
  const ref: firebase.firestore.DocumentReference = await db
    .collection('projects')
    .add({ ...project })
  const id = ref.id
  commit(types.ADD_PROJECT, { ...project, id })
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
  commit(types.ADD_PROJECT, project)
}

export const storeProjectFormData = ({ commit }: IActionContext, project: Project) => {
  const projectData = { ...project } // clone the Project object to prevent it mutating
  const pid = setTimeout(
    () => localStorage.setItem(SAVED_CREATE_PROJECT_FORM_DATA_KEY, JSON.stringify(projectData)),
    LOCALSTORAGE_WRITE_DEBOUNCE
  )
  commit(types.SET_SAVED_CREATE_PROJECT_FORM_DATA, projectData)
  commit(types.SET_SAVED_CREATE_PROJECT_FORM_DATA_WRITE_PID, pid)
}

export const clearProjectFormData = ({ commit }: IActionContext) => {
  commit(types.CLEAR_SAVED_CREATE_PROJECT_FORM_DATA)
  localStorage.removeItem(SAVED_CREATE_PROJECT_FORM_DATA_KEY)
}

export const removeNotification = ({ commit }: IActionContext) => {
  commit(types.REMOVE_NOTIFICATION)
}
