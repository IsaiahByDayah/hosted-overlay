import { AppBar, Toolbar, Box, Typography, Button, Stack } from "@mui/material"

import { useAuthContext } from "components/scaffold/AuthProvider"

import SignedIn from "components/common/SignedIn"
import OpenOverlayButton from "components/common/OpenOverlayButton"

const Header = () => {
  const { signOut } = useAuthContext()

  return (
    <AppBar position="relative">
      <Toolbar component={Stack} spacing={2} direction="row">
        <Typography sx={{ flexGrow: 1 }}>Hosted Overlay</Typography>
        <SignedIn>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={() => signOut()}>
              Sign Out
            </Button>
            <OpenOverlayButton />
          </Stack>
        </SignedIn>
      </Toolbar>
    </AppBar>
  )
}

export default Header
