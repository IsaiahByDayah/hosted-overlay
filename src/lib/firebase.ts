import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
import "firebase/analytics"

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

firebase.initializeApp(firebaseConfig)

// if (process.env.NODE_ENV === "development") {
if (constatnts.IS_EMULATOR) {
  console.log(
    "%c Running Firebase in Dev Mode. Connecting to local emulator suite...",
    "font-size: 18pt; color: #0984e3"
  )
  firebase.auth().useEmulator("http://localhost:9099/")
  firebase.firestore().useEmulator("localhost", 8080)
  firebase.functions().useEmulator("localhost", 5001)
} else {
  console.log(
    "%c Running Firebase in Production Mode.",
    "font-size: 18pt; color: #FC814A"
  )
}

export default firebase
