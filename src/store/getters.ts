import State from './State'
import IProjectList from '@/interfaces/ProjectList'
import { COUNTRIES } from '../data/countries'
import { ORGANIZATION_TYPES } from '../data/organization-types'
import { PROJECT_TYPES } from '../data/project'
import Project from '@/models/Project'

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

export const getFilteredProjects = ({ projects, projectFilters }: State): Project[] => {
  let projectsArray = Object.values(projects)
  const hasFilters = !Object.values(projectFilters).find((v: string) => !!v)

  // filter out deleted projects
  projectsArray = projectsArray.filter((project) => !project.deleted)

  // filter against projectFilters
  if (hasFilters) {
    projectsArray = projectsArray.filter((project) =>
      Object.entries(projectFilters).every(
        ([prop, filter]) => (filter ? project[prop] === filter : true)
      )
    )
  }

  // sort by created date
  return projectsArray.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) {
      return 0
    }
    return b.createdAt.getTime() - a.createdAt.getTime()
  })
}

export const getProjectFilters = ({ projectFilters }: State) => projectFilters

export const getCountryName = () => (countryCode: string) => {
  return countryCode in COUNTRIES ? COUNTRIES[countryCode] : null
}

export const getProjectTypeName = () => (projectType: string) => {
  return projectType in PROJECT_TYPES ? PROJECT_TYPES[projectType] : null
}

export const getOrganizationType = () => (orgType: string): string | null => {
  return orgType in ORGANIZATION_TYPES ? ORGANIZATION_TYPES[orgType] : null
}

export const getIsUserVolunteerProject = ({ userVolunteerProjects }: State) => (
  projectId: string
) => {
  return userVolunteerProjects.includes(projectId)
}
