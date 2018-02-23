import Firebase from 'firebase'
import { Mutation } from 'vuex'

import Project from '../models/Project'
import State from './State'
import { setTimeout } from 'timers'

export const ADD_PROJECT: Mutation<State> = (state, project: Project) => {
  if (!project.id) {
    return
  }
  state.projects[project.id] = project
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
