import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material"

import { useAuthContext } from "components/scaffold/AuthProvider"

import SignedIn from "components/common/SignedIn"

const Header = () => {
  const { signOut } = useAuthContext()

  return (
    <AppBar position="relative">
      <Toolbar component={Stack} spacing={2} direction="row">
        <Typography sx={{ flexGrow: 1 }}>Hosted Overlay</Typography>
        <SignedIn>
          <Stack spacing={2} direction="row">
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </Stack>
        </SignedIn>
      </Toolbar>
    </AppBar>
  )
}

export default Header
