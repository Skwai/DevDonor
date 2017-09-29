import * as auth from './auth'
import * as notifications from './notifications'
import * as projects from './projects'
import * as users from './users'
import * as meta from './meta'
import * as organizations from './organizations'

export default {
  ...auth,
  ...notifications,
  ...projects,
  ...users,
  ...meta,
  ...organizations
}
