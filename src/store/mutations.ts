import Project from '@/types/Project'
import State from './State'
import { MutationTree, Mutation } from 'vuex'

export const ADD_PROJECT: Mutation<State> = (state, project: Project) => {
  state.projects.push(project)
}

export default <MutationTree<State>> {
  ADD_PROJECT
}
