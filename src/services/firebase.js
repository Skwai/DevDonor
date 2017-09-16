import config from '../config'
import Firebase from 'firebase'

export const firebaseApp = Firebase.initializeApp(config.FIREBASE)
export const db = firebaseApp.database()

export const bindObject = (vm, key, source) =>
  new Promise((resolve, reject) =>
    vm.$bindAsObject(
      key,
      source,
      reject,
      (snapshot) => resolve(snapshot.val()
    )))
