import { ActionContext, ActionTree, Action } from 'vuex'
import State from './state'
import * as auth from '@/services/auth'
import db from '@/services/db'

export const login = async ({ commit }: ActionContext<State, any>): Promise<void> => {
  const userRecord = await auth.signIn()
  const userData = userRecord.user.toJSON()
  commit('SET_CURRENT_USER', userData)
}

export const getCurrentUser = async ({ commit }: ActionContext<State, any>): Promise<void> => {
  const userRecord = await auth.getCurrentUser()

  if (userRecord) {
    const userData = userRecord.toJSON()
    commit('SET_CURRENT_USER', userData)
  }
}

export const getProjects = async (store: ActionContext<State, any>): Promise<void> => {
  const result = await db.collection('projects').get()
}
