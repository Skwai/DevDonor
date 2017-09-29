import config from '../config'
import Firebase from 'firebase'

Firebase.initializeApp(config.FIREBASE)

const db = Firebase.database()
export default db

const google = new Firebase.auth.GoogleAuthProvider()
google.addScope('https://www.googleapis.com/auth/userinfo.email')

export const currentUser = () => Firebase.auth().currentUser

export const signIn = () => Firebase.auth().signInWithPopup(google)

export const signOut = () => Firebase.auth().signOut()

export const storage = Firebase.storage()

export const getCurrentUser = () => new Promise((resolve, reject) => {
  const user = currentUser()
  if (user) {
    resolve(user)
  } else {
    Firebase.auth().onAuthStateChanged((u) => u ? resolve(u) : reject(null))
  }
})

export const formatObjects = (snapshot) => Object.keys(snapshot.val()).map((k) => ({
  '.key': k,
  ...(snapshot.val()[k])
}))

export const toObject = (snapshot) => ({
  '.key': snapshot.key,
  ...snapshot.val()
})
