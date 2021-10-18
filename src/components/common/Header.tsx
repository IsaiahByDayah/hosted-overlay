import { useHistory, Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material"

import { useAuthContext } from "components/scaffold/AuthProvider"

import SignedIn from "components/common/SignedIn"

const Header = () => {
  const { signOut } = useAuthContext()
  const history = useHistory()

  const handleSignOut = async () => {
    try {
      await signOut()
      history.push("/")
    } catch (e) {
      console.log("Error Signing Out... ", e)
    }
  }

  return (
    <AppBar position="relative">
      <Toolbar component={Stack} spacing={2} direction="row">
        <Typography sx={{ flexGrow: 1 }}>Hosted Overlay</Typography>
        <SignedIn>
          <Stack spacing={2} direction="row">
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
            <Button
              component={Link}
              to="/admin"
              color="inherit"
              variant="outlined"
            >
              Admin Panel
            </Button>
          </Stack>
        </SignedIn>
      </Toolbar>
    </AppBar>
  )
}

export default Header
