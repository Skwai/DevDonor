import config from '../config'
import Firebase from 'firebase'

export const firebaseApp = Firebase.initializeApp(config.FIREBASE)
export const db = firebaseApp.database()

