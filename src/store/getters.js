import config from '@/config'

import { filterObject } from '@/misc'

export const getCharityType = () => (type) => config.CHARITY_TYPES[type.toLowerCase()]
export const authenticating = ({ authenticating }) => authenticating
export const auth = ({ auth }) => auth
export const uid = ({ uid }) => uid
export const notification = ({ notification }) => notification
export const skills = ({ skills }) => skills
export const countries = ({ countries }) => Object.keys(countries)

export const getProjects = ({ projects }) => (filters) => projects
export const getProject = ({ projects }) => (key) => projects[key]
export const isNewProject = ({ projects }) => (key) => {
  const project = projects[key]
  if (!project || !project.createdAt) return false
  const delta = new Date().getTime() - new Date(project.createdAt).getTime()
  const microtime = 24 * 60 * 60 * 1000 * config.NEW_THRESHOLD_DAYS
  return delta < microtime
}

export const getUserProjectCount = ({ users }) => (uid) => {
  if (!(uid in users)) return 0
  const user = users[uid]
  return user.projects instanceof Object ? Object.keys(user.projects).length : 0
}

export const currentUser = ({ uid, users }) => uid in users ? users[uid] : null
export const getUser = ({ users }) => (uid) => uid in users ? users[uid] : null
export const getUserProjectIds = ({ users }) => (uid) => users[uid].projects
export const getUserProjects = ({ projects }) =>
  (uid) => filterObject(projects, (k, v) => v.volunteers instanceof Object && uid in v.volunteers)
export const getUserOrganizations = ({ organizations }) =>
  (uid) => filterObject(organizations, (k, v) => v.users instanceof Object && uid in v.users)
export const getOrganization = ({ organizations }) => (key) => key in organizations ? organizations[key] : null
