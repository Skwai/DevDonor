import Firebase from 'firebase'

const google = new Firebase.auth.GoogleAuthProvider()
google.addScope('https://www.googleapis.com/auth/userinfo.email')

export const login = () => Firebase.auth().signInWithPopup(google)
