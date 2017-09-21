import config from '@/config'

export const getCharityType = () => (type) => config.CHARITY_TYPES[type.toLowerCase()]
export const currentUser = ({ currentUser }) => currentUser
export const authenticating = ({ authenticating }) => authenticating
export const accountType = ({ accountType }) => accountType
