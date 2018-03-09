import State from './State'
import IProjectList from '@/interfaces/ProjectList'
import { COUNTRIES } from '../data/countries'
import { ORGANIZATION_TYPES } from '../data/organization-types'
import { PROJECT_TYPES } from '../data/project'
import Project from '@/models/Project'
import IProjectFilters from '@/interfaces/ProjectFilters'

export const getProjects = ({ projects }: State): Project[] => {
  return Object.values(projects)
}

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

export const getFilteredProjects = ({ projects }: State) => (
  projectFilters: IProjectFilters
): Project[] => {
  const filteredProjects = []
  const projectFilterEntries = Object.entries(projectFilters)

  for (const id in projects) {
    const project = projects[id]

    const filtered = projectFilterEntries.every(
      ([prop, filter]) => (filter ? project[prop] === filter : true)
    )

    if (filtered) {
      filteredProjects.push(project)
    }
  }

  return filteredProjects.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) {
      return 0
    }
    return a.createdAt.getTime() - b.createdAt.getTime()
  })
}

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
