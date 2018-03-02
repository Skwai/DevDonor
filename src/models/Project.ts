import IProjectProperties from '../interfaces/ProjectProperties'

export default class Project {
  [key: string]: any
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

  public deleted: Date | null = null

  constructor(props: IProjectProperties = {}) {
    Object.assign(this, props)
  }
}
