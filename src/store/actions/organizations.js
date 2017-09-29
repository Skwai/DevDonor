import db from '@/services/firebase'
import { ADD_ORGANIZATION } from '@/store/mutation-types'

export const getOrganization = async ({ state, commit }, key) => {
  if (!(key in state.organizations)) {
    const snapshot = await db.ref('organizations').child(key).once('value')
    commit(ADD_ORGANIZATION, snapshot)
  }
}
