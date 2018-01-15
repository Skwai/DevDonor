import Project from '@/models/Project'
import State from './State'
import { Mutation } from 'vuex'
import Firebase from 'firebase'

export const ADD_PROJECT: Mutation<State> = (state, project: Project) => {
  state.projects.push(project)
}

export const SET_CURRENT_USER: Mutation<State> = (state, user: Firebase.User) => {
  state.currentUser = user
}
