import { useState } from "react"
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { signInWithEmailAndPassword } from "firebase/auth"

import firebase from "lib/firebase"

import Header from "components/common/Header"

const useStyles = makeStyles(({ spacing }) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: spacing(4),
  },
  pageTitle: {
    fontWeight: "bold",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: spacing(2),
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  row: {
    gap: spacing(2),
  },
  noShrink: {
    flexShrink: 0,
  },
}))

const Home = () => {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = () => {
    signInWithEmailAndPassword(firebase.auth, email, password)
  }

  return (
    <div>
      <Header />
      <Container className={classes.content} component={Box} mt={2}>
        {/* <Typography className={classes.pageTitle} variant="h5">
          Home Page
        </Typography> */}

        {/* Signin Section */}
        <div className={classes.section}>
          <Typography className={classes.sectionTitle}>
            Sign In / Sign Up
          </Typography>
          <Box className={classes.row} display="flex" alignItems="start">
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
          </Box>
        </div>
      </Container>
    </div>
  )
}
export default Home
