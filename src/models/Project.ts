export interface IProjectProperties {
  id?: string
  title?: string
  description?: string
  projectType?: string
  country?: string
  state?: string
  createdAt?: Date
  organizationName?: string
  organizationType?: string
  organizationLogo?: string
  organizationDescription?: string
  email?: string
}

export default class Project {
  public id?: string
  public createdAt?: Date

  public title: string = ''
  public description: string = ''
  public projectType: string = ''
  public country: string = ''
  public organizationName: string = ''
  public organizationType: string = ''
  public organizationLogo: string = ''
  public organizationDescription: string = ''
  public email: string = ''

  constructor(props: IProjectProperties = {}) {
    Object.assign(this, props)
  }
}
