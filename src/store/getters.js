import config from '@/config'

export const getCharityType = () => (type) => config.CHARITY_TYPES[type.toLowerCase()]
export const authenticating = ({ authenticating }) => authenticating
export const auth = ({ auth }) => auth
export const uid = ({ uid }) => uid
export const notification = ({ notification }) => notification
export const skills = ({ skills }) => Object.keys(skills)
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
export const currentUser = ({ uid, users }) => uid in users ? users[uid] : null
export const getUserProjectIds = ({ users }) => (uid) => users[uid].projects
export const getUserProjects = ({ users, projects }) => (uid) => {
  if (uid in users) {
    const ids = Object.keys(users[uid].projects)
    return ids.reduce((obj, k) => Object.assign(obj, { [k]: projects }), {})
  }
  return {}
}
export const getUserOrganizations = ({ users, organizations }) => (uid) => {}
export const getOrganization = ({ organizations }) => (key) => key in organizations ? organizations[key] : null
