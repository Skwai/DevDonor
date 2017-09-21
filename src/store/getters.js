import config from '@/config'

export const getCharityType = () => (type) => config.CHARITY_TYPES[type.toLowerCase()]
export const authenticating = ({ authenticating }) => authenticating
export const auth = ({ auth }) => auth
export const uid = ({ uid }) => uid || null
