import State from './State'
import IProjectList from '@/interfaces/ProjectList'

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

export const getPendingAuth = ({ pendingAuth }: State) => pendingAuth

export const getNotification = ({ notification }: State) => notification

export const getFilteredProjects = ({ projects, projectFilters }: State): IProjectList => {
  return Object.entries(projects)
    .filter(([id, project]) => {
      return Object.entries(projectFilters).every(([propName, filter]) => {
        return filter ? project[propName] === filter : true
      })
    })
    .reduce((obj: IProjectList, [id, project]) => {
      obj[id] = project
      return obj
    }, {})
}

export const getProjectFilters = ({ projectFilters }: State) => projectFilters
