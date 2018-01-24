export default class Project {
  public id: string | null = ''
  public title: string = ''
  public description: string = ''
  public type: string = ''
  public country: string = ''
  public createdAt: Date = new Date()
  public organizationName: string = ''
  public organizationType: string = ''
  public organizationLogo: string = ''
  public organizationDescription: string = ''
}
