import { useState } from "react"
import { TextField, Button, Container, Typography, Stack } from "@mui/material"

import { signInWithEmailAndPassword } from "firebase/auth"

import firebase from "lib/firebase"

import Header from "components/common/Header"

const Home = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = () => {
    signInWithEmailAndPassword(firebase.auth, email, password)
  }

  return (
    <div>
      <Header />
      <Container component={Stack} spacing={5} sx={{ py: 2 }}>
        {/* Signin Section */}
        <Stack component="form" spacing={2} onSubmit={() => submit()}>
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
            <Button sx={{ flexShrink: 0 }} type="submit">
              Sign In
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
export default Home
