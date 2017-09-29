import config from '@/config'

export const getCharityType = () => (type) => config.CHARITY_TYPES[type.toLowerCase()]
export const authenticating = ({ authenticating }) => authenticating
export const auth = ({ auth }) => auth
export const uid = ({ uid }) => uid
export const notification = ({ notification }) => notification
export const showSignupSplash = ({ showSignupSplash }) => showSignupSplash

export const getProjects = ({ projects }) => (filters) => projects
export const getProject = ({ projects }) => (key) => projects[key]
export const getProjectIsNew = ({ projects }) => (key) => {
  const project = projects[key]
  if (!project || !project.createdAt) return false
  const delta = new Date().getTime() - new Date(project.createdAt).getTime()
  const microtime = 24 * 60 * 60 * 1000 * config.NEW_THRESHOLD_DAYS
  return delta < microtime
}
