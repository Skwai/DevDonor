import db from '@/services/firebase'
import { ADD_COUNTRIES, ADD_SKILLS } from '@/store/mutation-types'

export const getCountries = async ({ state, commit }) => {
  if (!Object.keys(state.countries).length) {
    const snapshot = await db.ref('countries').once('value')
    commit(ADD_COUNTRIES, snapshot)
  }
}

export const getSkills = async ({ state, commit }) => {
  if (!Object.keys(state.skills).length) {
    const snapshot = await db.ref('skills').once('value')
    commit(ADD_SKILLS, snapshot)
  }
}
