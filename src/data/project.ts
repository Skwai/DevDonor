export const PROJECT_TYPES: {
  [key: string]: any
} = {
  web: 'Web',
  mobile: 'Mobile',
  desktop: 'Desktop',
  ops: 'Operations'
}

export const PROJECT_TYPES_WITH_DESCRIPTIONS = Object.entries({
  web: 'A web app that runs in your browser',
  mobile: 'A mobile app for Android or iOS phones and tablets',
  desktop: 'A desktop app for Windows, Mac or Linux',
  ops: 'Operations and systems infrastructure'
}).reduce(
  (obj: any, [k, v]) => {
    if (k in obj) {
      obj[k] += ` - ${v}`
    }
    return obj
  },
  { ...PROJECT_TYPES }
)
