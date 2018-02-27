export interface IProjectProperties {
  id?: string
  createdAt?: Date
  ownerId?: string

  title?: string
  description?: string
  projectType?: string
  country?: string
  state?: string
  organizationName?: string
  organizationType?: string
  organizationLogo?: string
  organizationDescription?: string
  organizationUrl?: string
  email?: string
}

export default class Project {
  public id?: string
  public createdAt?: Date
  public ownerId?: string

  public title: string = ''
  public description: string = ''
  public projectType: string = ''
  public country: string = ''
  public organizationName: string = ''
  public organizationType: string = ''
  public organizationLogo: string = ''
  public organizationDescription: string = ''
  public email: string = ''
  public organizationUrl: string = ''

  constructor(props: IProjectProperties = {}) {
    Object.assign(this, props)
  }
}
