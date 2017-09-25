import config from '../config'
import Firebase from 'firebase'

export const app = Firebase.initializeApp(config.FIREBASE)
export const db = app.database()
export const provider = new Firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

export const auth = () => app.auth()

export const currentUser = () => auth().currentUser

export const signIn = () => auth().signInWithPopup(provider)

export const signOut = () => auth().signOut()

export const storage = Firebase.storage()

export const getCurrentUser = () => new Promise((resolve, reject) => {
  const user = currentUser()
  if (user) {
    resolve(user)
  } else {
    auth().onAuthStateChanged((u) => u ? resolve(u) : reject(null))
  }
})
