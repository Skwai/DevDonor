import config from '../config'
import Firebase from 'firebase'

export const firebaseApp = Firebase.initializeApp(config.FIREBASE)
export const db = firebaseApp.database()
export const provider = new Firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')
export const login = () => firebaseApp.auth().signInWithPopup(provider)
export const currentUser = () => Firebase.auth().currentUser
export const logout = () => Firebase.auth().signOut()
