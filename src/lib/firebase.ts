import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import {
  initializeFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"

import constatnts from "lib/constants"

const firebaseConfig = {
  apiKey: "AIzaSyAyIWCiQwo6ZvMsQ2A7HprugGZLs2CJyiI",
  authDomain: "hosted-overlay.firebaseapp.com",
  projectId: "hosted-overlay",
  storageBucket: "hosted-overlay.appspot.com",
  messagingSenderId: "156902214892",
  appId: "1:156902214892:web:05f578f8fe6a5adad9e9c9",
  measurementId: "G-7V438VPSXK",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})
const functions = getFunctions(app)

if (constatnts.IS_EMULATOR) {
  console.log(
    "%c Running Firebase in Dev Mode. Connecting to local emulator suite...",
    "font-size: 18pt; color: #0984e3"
  )
  // Auth
  connectAuthEmulator(auth, "http://localhost:9099/")
  // Firestore
  connectFirestoreEmulator(firestore, "localhost", 8080)
  // Functions
  connectFunctionsEmulator(functions, "localhost", 5001)
} else {
  console.log(
    "%c Running Firebase in Production Mode.",
    "font-size: 18pt; color: #FC814A"
  )
}

const firebase = {
  app,
  auth,
  firestore,
  functions,
}

export default firebase
