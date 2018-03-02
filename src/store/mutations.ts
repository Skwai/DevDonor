import Firebase from 'firebase'
import { Mutation, MutationTree } from 'vuex'

import Project from '../models/Project'
import State from './State'
import { setTimeout } from 'timers'
import * as types from './types'

const mutations: MutationTree<State> = {
  [types.ADD_PROJECT](state, project: Project) {
    if (project.id) {
      state.projects[project.id] = project
    }
  },

  [types.SET_CURRENT_USER](state, user: Firebase.User) {
    state.currentUser = user
  },

  [types.SET_SAVED_CREATE_PROJECT_FORM_DATA_WRITE_PID](state, pid: number) {
    if (state.savedCreateProjectFormDataWritePID) {
      clearTimeout(state.savedCreateProjectFormDataWritePID)
    }
    state.savedCreateProjectFormDataWritePID = pid
  },

  [types.SET_SAVED_CREATE_PROJECT_FORM_DATA](state, project: Project) {
    state.savedCreateProjectFormData = project
  },

  [types.CLEAR_SAVED_CREATE_PROJECT_FORM_DATA](state, project: Project) {
    state.savedCreateProjectFormData = {}
  },

  [types.SET_PENDING_AUTH](state) {
    state.pendingAuth = true
  },

  [types.RESET_PENDING_AUTH](state) {
    state.pendingAuth = false
  },

  [types.SET_NOTIFICATION](state, { message, type }: { message: string; type: string }) {
    state.notification = { message, type }
  },

  [types.REMOVE_NOTIFICATION](state) {
    state.notification = null
  },

  [types.REMOVE_CURRENT_USER](state) {
    state.currentUser = null
  },

  [types.SET_PROJECT_FILTERS](state, filters) {
    state.projectFilters = filters
  }
}

export default mutations
