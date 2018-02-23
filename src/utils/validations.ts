// https://github.com/monterail/vuelidate

export const required = (value: any) => {
  if (Array.isArray(value)) {
    return !!value.length
  }
  if (value === undefined || value === null || value === false) {
    return false
  }
  if (value instanceof Date) {
    // invalid date won't pass
    return !isNaN(value.getTime())
  }
  if (typeof value === 'object') {
    for (const _ in value) {
      return true
    }
    return false
  }
  return !!String(value).length
}

export const len = (value: any) => {
  if (Array.isArray(value)) {
    return value.length
  }
  if (typeof value === 'object') {
    return Object.keys(value).length
  }
  return String(value).length
}

export const minLength = (value: any, length: number) => {
  return len(value) >= length
}

export const maxLength = (value: any, length: number) => {
  return len(value) <= length
}

export const isEmail = (value: string) => {
  const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
  return emailRegex.test(value)
}

export const isURL = (value: string) => {
  const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return urlRegex.test(value)
}
