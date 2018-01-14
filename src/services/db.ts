import * as Firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../config'

const app = Firebase.initializeApp(config.FIREBASE)
export default app.firestore()
