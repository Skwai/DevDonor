import Firebase from 'firebase'
import { Mutation, MutationTree } from 'vuex'

import Project from '../models/Project'
import State from './State'
import { setTimeout } from 'timers'
import * as types from './types'
import IProjectProperties from '@/interfaces/ProjectProperties'

const mutations: MutationTree<State> = {
  [types.ADD_PROJECT](state, project: Project) {
    if (project.id) {
      state.projects[project.id] = project
    }
  },

  [types.REMOVE_PROJECT](state, projectId: string) {
    delete state[projectId]
  },

  [types.SET_CURRENT_USER](state, user: Firebase.UserInfo) {
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

  [types.UPDATE_PROJECT](
    state,
    { projectId, data }: { projectId: string; data: IProjectProperties }
  ) {
    if (projectId in state.projects) {
      state.projects[projectId] = { ...state.projects[projectId], ...data }
    }
  },

  [types.ADD_VOLUNTEER_PROJECT](state, projectId: string) {
    if (!state.userVolunteerProjects.includes(projectId)) {
      state.userVolunteerProjects.push(projectId)
    }
  },

  [types.SET_NEXT_PROJECT_ID](state, projectId: string) {
    state.nextProjectId = projectId
  },

  [types.UNSET_NEXT_PROJECT_ID](state) {
    state.nextProjectId = null
  }
}

export default mutations
