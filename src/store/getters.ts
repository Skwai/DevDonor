import State from './State'

export const getProjects = ({ projects }: State) => projects

export const getCurrentUser = ({ currentUser }: State) => currentUser

export const getProjectByID = ({ projects }: State) => (projectID: string) => {
  if (projectID in projects) {
    return projects[projectID]
  }
  return null
}

export const getSavedCreateProjectFormData = ({ savedCreateProjectFormData }: State) =>
  savedCreateProjectFormData

export const pendingAuth = ({ pendingAuth }: State) => pendingAuth

export const notification = ({ notification }: State) => notification
