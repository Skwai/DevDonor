import * as firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../config'

const app = firebase.initializeApp(config.FIREBASE)
const db = app.firestore()
