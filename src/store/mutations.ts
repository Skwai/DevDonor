import Firebase from 'firebase'
import { Mutation } from 'vuex'

import Project from '../models/Project'
import State from './State'

export const ADD_PROJECT: Mutation<State> = (state, project: Project) => {
  if (!project.id) return
  state.projects[project.id] = project
}

export const SET_CURRENT_USER: Mutation<State> = (
  state,
  user: Firebase.User
) => {
  state.currentUser = user
}
