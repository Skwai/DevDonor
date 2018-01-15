import Firebase from 'firebase'
import 'firebase/firestore'
import config from '../config'

const app = Firebase.initializeApp(config.FIREBASE)

export const storage = Firebase.storage()

export default app.firestore()
