import config from '@/config'

export const getCharityType = () => (type) => config.CHARITY_TYPES[type.toLowerCase()]
export const getProfile = ({ profile }) => profile
