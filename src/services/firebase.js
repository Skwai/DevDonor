import config from '../config'
import Firebase from 'firebase'

export const firebaseApp = Firebase.initializeApp(config.FIREBASE)
export const db = firebaseApp.database()
export const provider = new Firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

export const sanitizeRef = (data) => {
  const keys = Object.keys(data)
  if (!keys.length) return {}
  return keys.reduce((obj, key) => {
    const el = data[key]
    return Object.assign(obj, { [el['.key']]: el['.value'] })
  }, {})
}

export const currentUser = () => firebaseApp.auth().currentUser
export const signIn = () => firebaseApp.auth().signInWithPopup(provider)
export const signOut = () => firebaseApp.auth().signOut()
export const auth = () => firebaseApp.auth()
export const storage = Firebase.storage()
export const fb = Firebase

window.fb = firebaseApp
