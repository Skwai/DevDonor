import Firebase from 'firebase'

const google = new Firebase.auth.GoogleAuthProvider()
google.addScope(
  [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ].join(',')
)

const facebook = new Firebase.auth.FacebookAuthProvider()
facebook.addScope(['email', 'public_profile'].join(','))

interface IAuthProviders {
  [key: string]: any
}

const authProviders: IAuthProviders = {
  google,
  facebook
}

export const signIn = (provider: string): Promise<any> => {
  if (provider in authProviders) {
    return Firebase.auth().signInWithPopup(authProviders[provider])
  }
  return Promise.reject('The authentication provider you supplied is not supported')
}

export const signOut = (): Promise<any> => Firebase.auth().signOut()

export const currentUser = (): Firebase.User | null => Firebase.auth().currentUser

export const getCurrentUser = (): Promise<Firebase.User | null> => {
  const authUser = currentUser()
  if (authUser) {
    return Promise.resolve(authUser)
  }
  return new Promise((resolve, reject) => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user)
      } else {
        reject('No authenticated user found')
      }
    })
  })
}
