import * as auth from './auth'
import * as notifications from './notifications'
import * as projects from './projects'

export default {
  ...auth,
  ...notifications,
  ...projects
}
