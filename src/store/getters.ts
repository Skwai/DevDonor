import State from './State'
import IProjectList from '@/interfaces/ProjectList'
import { COUNTRIES } from '../data/countries'
import { ORGANIZATION_TYPES } from '../data/organization-types'

export const getProjects = ({ projects }: State) => projects

export const getCurrentUser = ({ currentUser }: State) => currentUser

export const getCurrentUserId = ({ currentUser }: State) => {
  if (currentUser && currentUser.uid) {
    return currentUser.uid
  }
  return null
}

export const getProjectById = ({ projects }: State) => (projectId: string) => {
  if (projectId in projects) {
    return projects[projectId]
  }
  return null
}

export const getSavedCreateProjectFormData = ({ savedCreateProjectFormData }: State) =>
  savedCreateProjectFormData

export const getPendingAuth = ({ pendingAuth }: State) => pendingAuth

export const getNotification = ({ notification }: State) => notification

export const getFilteredProjects = ({ projects, projectFilters }: State): IProjectList => {
  if (!Object.values(projectFilters).find((v: string) => !!v)) {
    return projects
  }

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

export const getCountryName = () => (countryCode: string) => {
  return countryCode in COUNTRIES ? COUNTRIES[countryCode] : null
}

export const getOrganizationType = () => (orgType: string): string | null => {
  return orgType in ORGANIZATION_TYPES ? ORGANIZATION_TYPES[orgType] : null
}
