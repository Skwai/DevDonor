import firebase from 'firebase'
import 'firebase/firestore'
import { FIREBASE } from '../config'

const app = firebase.initializeApp(FIREBASE)

const db = app.firestore()

export default db

export const storage = firebase.storage()

export const createID = (): string => {
  const collection = db.collection('collection')
  return collection.doc().id
}
