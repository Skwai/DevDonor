import Firebase from 'firebase'

const google = new Firebase.auth.GoogleAuthProvider()
google.addScope('https://www.googleapis.com/auth/userinfo.email')

export const signIn = (): Promise<any> =>
  Firebase.auth().signInWithPopup(google)

export const signOut = (): Promise<any> => Firebase.auth().signOut()

export const currentUser = (): Firebase.User | null =>
  Firebase.auth().currentUser

export const getCurrentUser = (): Promise<Firebase.User | null> => {
  const authedUser = currentUser()

  if (authedUser) {
    return Promise.resolve(authedUser)
  }

  return new Promise((resolve, reject) =>
    Firebase.auth().onAuthStateChanged(
      firebaseUser => (firebaseUser ? resolve(firebaseUser) : reject(null))
    )
  )
}
