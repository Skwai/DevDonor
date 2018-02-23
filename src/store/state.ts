import Project from '../models/Project'

import { SAVED_CREATE_PROJECT_FORM_DATA_KEY } from '../config'

export interface IStateProjectList {
  [key: string]: Project
}

const getLocalStorageData = (key: string): any => {
  const data = localStorage.getItem(SAVED_CREATE_PROJECT_FORM_DATA_KEY)
  return data ? JSON.parse(data) : null
}

export default class State {
  public projects: IStateProjectList = {}
  public currentUser: any = null
  // data from an uncompleted form
  public savedCreateProjectFormData: {} = getLocalStorageData(SAVED_CREATE_PROJECT_FORM_DATA_KEY) ||
    {}
  // a setTimeout ID matching a write to localStorage
  public savedCreateProjectFormDataWritePID: number | null = null
}
