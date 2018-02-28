export default interface IProjectProperties {
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
