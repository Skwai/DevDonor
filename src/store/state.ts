import Project from '../models/Project'

export interface IStateProjectList {
  [key: string]: Project
}

export default class State {
  public projects: IStateProjectList = {}
  public currentUser: any = null
}
