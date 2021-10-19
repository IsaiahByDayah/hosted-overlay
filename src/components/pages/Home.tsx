import { useState, FormEvent } from "react"
import { useHistory } from "react-router-dom"
import { TextField, Button, Container, Typography, Stack } from "@mui/material"

import { signInWithEmailAndPassword } from "firebase/auth"

import firebase from "lib/firebase"

import Header from "components/common/Header"
import SignedOut from "components/common/SignedOut"

const Home = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(firebase.auth, email, password)
      history.push("/admin")
    } catch (e) {
      console.log("Error Signing In... ", e)
    }
  }

  return (
    <div>
      <Header />
      <Container component={Stack} spacing={5} sx={{ py: 5 }}>
        {/* Signin Section */}
        <SignedOut>
          <Stack component="form" spacing={2} onSubmit={submit}>
            <Typography fontWeight="bold">Sign In / Sign Up</Typography>
            <Stack direction="row" alignItems="baseline" spacing={2}>
              <TextField
                sx={{ flexGrow: 1 }}
                label="Email"
                placeholder="hello@streamers.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value)
                }}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                sx={{ flexGrow: 1 }}
                label="Password"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value)
                }}
                InputLabelProps={{ shrink: true }}
              />
              <Button sx={{ flexShrink: 0 }} variant="contained" type="submit">
                Sign In
              </Button>
            </Stack>
          </Stack>
        </SignedOut>
      </Container>
    </div>
  )
}
export default Home
