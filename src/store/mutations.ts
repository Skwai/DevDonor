import Firebase from 'firebase'
import { Mutation } from 'vuex'

import Project from '../models/Project'
import State from './State'
import { setTimeout } from 'timers'

export const ADD_PROJECT: Mutation<State> = (state, project: Project) => {
  if (project.id) {
    state.projects[project.id] = project
  }
}

export const SET_CURRENT_USER: Mutation<State> = (state, user: Firebase.User) => {
  state.currentUser = user
}

export const SET_SAVED_CREATE_PROJECT_FORM_DATA_WRITE_PID: Mutation<State> = (
  state,
  pid: number
) => {
  if (state.savedCreateProjectFormDataWritePID) {
    clearTimeout(state.savedCreateProjectFormDataWritePID)
  }
  state.savedCreateProjectFormDataWritePID = pid
}

export const SET_SAVED_CREATE_PROJECT_FORM_DATA: Mutation<State> = (state, project: Project) => {
  state.savedCreateProjectFormData = project
}

export const CLEAR_SAVED_CREATE_PROJECT_FORM_DATA: Mutation<State> = (state, project: Project) => {
  state.savedCreateProjectFormData = {}
}

export const SET_PENDING_AUTH: Mutation<State> = (state) => {
  state.pendingAuth = true
}

export const RESET_PENDING_AUTH: Mutation<State> = (state) => {
  state.pendingAuth = false
}

export const SET_ERROR_NOTIFICATION: Mutation<State> = (state, message: string) => {
  state.notification = { message, type: 'error' }
}

export const REMOVE_NOTIFICATION: Mutation<State> = (state) => {
  state.notification = null
}
