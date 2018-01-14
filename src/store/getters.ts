import State from './State'
import { GetterTree } from 'vuex';

export const projects = ({ projects }: State) => projects

export default <GetterTree<State, any>> {
  projects
}
