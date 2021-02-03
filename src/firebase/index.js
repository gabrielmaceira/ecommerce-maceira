import firebase from 'firebase/app'
import '@firebase/firestore'
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '../secret/keys'

const app = firebase.initializeApp(
  {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
  }
)

export const getFirebase = () => {
  return app
}

export const getFirestore = () => {
  return firebase.firestore(app)
}