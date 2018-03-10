import firebase from 'firebase'
import { Action, ActionContext } from 'vuex'

import Project from '../models/Project'
import * as auth from '../services/auth'
import db from '../services/db'
import State from './State'
import { SAVED_CREATE_PROJECT_FORM_DATA_KEY } from '../config'
import * as types from './types'
import IProjectFilters from '../interfaces/ProjectFilters'
import IProjectProperties from '@/interfaces/ProjectProperties'

const PAGINATION_LIMIT = 20

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
      commit(types.SET_NOTIFICATION, { message: err.message, type: 'error' })
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

export const loadProjects = async (
  { commit }: IActionContext,
  projectFilters: IProjectFilters = {}
): Promise<void> => {
  const col = await db.collection('projects')
  const query = Object.entries(projectFilters).reduce((prev: firebase.firestore.Query, [k, v]) => {
    return v ? prev.where(k, '==', v) : prev
  }, col.where('deleted', '==', null))
  const querySnapshot = await query.limit(PAGINATION_LIMIT).get()
  querySnapshot.forEach((docSnapshot: firebase.firestore.DocumentSnapshot) => {
    const id = docSnapshot.id
    commit(types.ADD_PROJECT, { ...docSnapshot.data(), id })
  })
}

export const createProject = async ({ commit, state }: IActionContext, project: Project) => {
  if (!state.currentUser || !state.currentUser.email) {
    throw Error('Current user is missing an email address')
  }

  const copy = { ...project }
  copy.email = state.currentUser.email
  copy.ownerId = state.currentUser.uid
  copy.createdAt = new Date()

  const ref = await db.collection('projects').add({ ...copy })
  copy.id = ref.id
  commit(types.ADD_PROJECT, copy)
}

export const loadProjectById = async ({ commit, state }: IActionContext, projectId: string) => {
  // Check if project is already in store
  if (projectId in state.projects) {
    return
  }

  // Load project from Firestore
  const projectRef = db.collection('projects').doc(projectId)
  const projectDoc = await projectRef.get()

  if (!projectDoc.exists) {
    throw Error('Project does not exist')
  }

  const project: IProjectProperties = {
    ...projectDoc.data(),
    id: projectDoc.id
  }

  if (state.currentUser && state.currentUser.uid) {
    try {
      const volunteerRef = projectRef.collection('volunteers').doc(state.currentUser.uid)
      const volunteerDoc = await volunteerRef.get()
      if (volunteerDoc.exists) {
        commit(types.ADD_VOLUNTEER_PROJECT, project.id)
      }
    } catch (err) {}
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

export const showError = ({ commit }: IActionContext, message: string) => {
  commit(types.SET_NOTIFICATION, { message, type: 'error' })
}

export const showSuccess = ({ commit }: IActionContext, message: string) => {
  commit(types.SET_NOTIFICATION, { message, type: 'success' })
}

export const removeNotification = ({ commit }: IActionContext) => {
  commit(types.REMOVE_NOTIFICATION)
}

export const updateProject = async (
  { commit, state }: IActionContext,
  {
    projectId,
    project
  }: {
    projectId: string
    project: IProjectProperties
  }
) => {
  const currentUser = state.currentUser
  const docRef = db.collection('projects').doc(projectId)

  const result = await db.runTransaction(async (transaction: firebase.firestore.Transaction) => {
    const doc = await transaction.get(docRef)
    const docData = doc.data()

    if (!doc.exists || !docData) {
      throw Error('Project does not exist')
    }

    if (!currentUser || !currentUser.uid || currentUser.uid !== docData.ownerId) {
      throw Error('You are not authorized to update this project')
    }

    const data = { ...project }
    delete data.id

    await transaction.update(docRef, data)
    commit(types.UPDATE_PROJECT, { projectId, data })
  })
}

export const deleteProject = async ({ commit, state }: IActionContext, projectId: string) => {
  const currentUser = state.currentUser
  const docRef = db.collection('projects').doc(projectId)

  await db.runTransaction(async (transaction: firebase.firestore.Transaction) => {
    const doc = await transaction.get(docRef)
    const docData = doc.data()

    if (!doc.exists || !docData) {
      throw Error('Project does not exist')
    }

    if (!currentUser || !currentUser.uid || currentUser.uid !== docData.ownerId) {
      throw Error('You are not authorized to delete this project')
    }

    const data = {
      deleted: new Date()
    }

    transaction.update(docRef, data)
  })
  commit(types.REMOVE_PROJECT, projectId)
}

export const createVolunteer = async (
  { commit }: IActionContext,
  { projectId, user, message }: { projectId: string; user: firebase.UserInfo; message: string }
) => {
  const volunteerData = {
    message,
    displayName: user.displayName,
    photoUrl: user.photoURL,
    email: user.email
  }

  const docRef = db
    .collection('projects')
    .doc(projectId)
    .collection('volunteers')
    .doc(user.uid)

  await db.runTransaction(async (transaction: firebase.firestore.Transaction) => {
    const doc = await transaction.get(docRef)

    if (doc.exists) {
      throw Error('User has already volunteered for this project')
    }

    transaction.set(docRef, volunteerData)
  })
}
