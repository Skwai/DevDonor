export default class Project {
  public id?: string | null

  public title: string = ''
  public description: string = ''
  public projectType: string = ''
  public country: string = ''
  public createdAt: Date = new Date()
  public organizationName: string = ''
  public organizationType: string = ''
  public organizationLogo: string = ''
  public organizationDescription: string = ''
  public email: string = ''

  constructor(args = {}) {
    Object.assign(this, args)
  }
}
