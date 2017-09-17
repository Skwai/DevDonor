import config from '../config'
import Firebase from 'firebase'
// import FirebaseUI from 'firebaseui'

export const firebaseApp = Firebase.initializeApp(config.FIREBASE)
export const db = firebaseApp.database()

/*
export const ui = new FirebaseUI.auth.AuthUI(Firebase.auth())
const uiConfig = {
  signInSuccessUrl: 'https://devdonor.com',
  signInOptions: [
    Firebase.auth.GoogleAuthProvider.PROVIDER_ID
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: 'https://devdonor.com'
}
*/

// export const login = (el) => ui.start(el, uiConfig)
export const provider = new Firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')
export const login = () => firebaseApp.auth().signInWithPopup(provider)
