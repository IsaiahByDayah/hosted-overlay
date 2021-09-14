import { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import { signInWithEmailAndPassword } from "firebase/auth"

import firebase from "lib/firebase"

const Home = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = () => {
    signInWithEmailAndPassword(firebase.auth, email, password)
  }

  return (
    <div>
      <TextField
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value)
        }}
      />
      <TextField
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value)
        }}
      />
      <Button onClick={() => submit()}>Sign In</Button>
    </div>
  )
}
export default Home
