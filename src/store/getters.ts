import State from './State'
import IProjectList from '@/interfaces/ProjectList'
import { COUNTRIES } from '../data/countries'
import { ORGANIZATION_TYPES } from '../data/organization-types'
import { PROJECT_TYPES } from '../data/project'
import Project from '@/models/Project'
import IProjectFilters from '@/interfaces/ProjectFilters'

import { PROJECTS_PER_PAGE } from '../config'

/**
 * Get all the projects in the store
 */
export const getProjects = ({ projects }: State): Project[] => {
  return Object.values(projects)
}

/**
 * Get the current user's Firebase user data
 */
export const getCurrentUser = ({ currentUser }: State) => currentUser

/**
 * Get the UID of the current user
 */
export const getCurrentUserId = ({ currentUser }: State) => {
  if (currentUser && currentUser.uid) {
    return currentUser.uid
  }
  return null
}

/**
 * Get a single project by its ID
 */
export const getProjectById = ({ projects }: State) => (projectId: string) => {
  if (projectId in projects) {
    return projects[projectId]
  }
  return null
}

/**
 * Get the persisted project form data from the store
 */
export const getSavedCreateProjectFormData = ({ savedCreateProjectFormData }: State) =>
  savedCreateProjectFormData

/**
 * Get the current pending auth state
 */
export const getPendingAuth = ({ pendingAuth }: State) => pendingAuth

/**
 * Get the current notification
 */
export const getNotification = ({ notification }: State) => notification

/**
 * Get a filtered Object of projects
 */
export const getFilteredProjects = ({ projects }: State) => ({
  projectFilters,
  pages = 1,
  projectsPerPage = PROJECTS_PER_PAGE
}: {
  projectFilters: IProjectFilters
  pages?: number
  projectsPerPage?: number
}): Project[] => {
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

  // slice to the page requested and filter by date created
  return filteredProjects.slice(0, pages * projectsPerPage).sort((a, b) => {
    if (!a.createdAt || !b.createdAt) {
      return 0
    }
    return b.createdAt.getTime() - a.createdAt.getTime()
  })
}

/**
 * Get the name of a country from its 2 character country code
 */
export const getCountryName = () => (countryCode: string) => {
  return countryCode in COUNTRIES ? COUNTRIES[countryCode] : null
}

/**
 * Get the name of a project type from its abbreviation
 */
export const getProjectTypeName = () => (projectType: string) => {
  return projectType in PROJECT_TYPES ? PROJECT_TYPES[projectType] : null
}

/**
 * Get an organization type from its abbreviation
 */
export const getOrganizationType = () => (orgType: string): string | null => {
  return orgType in ORGANIZATION_TYPES ? ORGANIZATION_TYPES[orgType] : null
}

/**
 * Check if the current user is a volunteer on a project
 */
export const getIsUserVolunteerProject = ({ userVolunteerProjects }: State) => (
  projectId: string
) => {
  return userVolunteerProjects.includes(projectId)
}

/**
 *
 * @param param0
 */
export const getNextProjectId = ({ nextProjectId }: State) => nextProjectId
