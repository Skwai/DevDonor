import Project from '../models/Project'
import IProjectList from '../interfaces/ProjectList'
import INotification from '../interfaces/Notification'

import { SAVED_CREATE_PROJECT_FORM_DATA_KEY } from '../config'

const getStorageData = (key: string): any => {
  const data = localStorage.getItem(SAVED_CREATE_PROJECT_FORM_DATA_KEY)
  return data ? JSON.parse(data) : null
}

export default class State {
  [key: string]: any
  public projects: IProjectList = {}
  public currentUser: firebase.UserInfo | null = null
  // data from an uncompleted form
  public savedCreateProjectFormData: {} = getStorageData(SAVED_CREATE_PROJECT_FORM_DATA_KEY) || {}
  // a setTimeout ID matching a write to localStorage
  public savedCreateProjectFormDataWritePID: number | null = null
  public pendingAuth: boolean = false
  public notification: INotification | null = null
  public userVolunteerProjects: string[] = []
}
