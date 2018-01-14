import { ActionContext, ActionTree, Action } from 'vuex'
import State from './state'
import * as auth from '@/services/auth'
import db from '@/services/db'

export const login = (store: ActionContext<State, any>): void => {
  auth.login()
}

export const getProjects = async (store: ActionContext<State, any>): Promise<void> => {
  const result = await db.collection('projects').get()
  console.log(result)
}
