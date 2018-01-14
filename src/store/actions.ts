import { ActionContext, ActionTree } from 'vuex'
import State from './state'

export const login = (store: ActionContext<State, any>) => {
  console.log('test')
}

export default <ActionTree<State, any>> {
  login
}
