import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material"

import { useAuthContext } from "components/scaffold/AuthProvider"

import SignedIn from "components/common/SignedIn"
import OpenOverlayButton from "components/common/OpenOverlayButton"

const Header = () => {
  const { signOut } = useAuthContext()

  return (
    <AppBar position="relative">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography>Hosted Overlay</Typography>
        </Box>
        <SignedIn>
          <Button variant="outlined" onClick={() => signOut()}>
            Sign Out
          </Button>
          <Box sx={{ ml: 2 }}>
            <OpenOverlayButton />
          </Box>
        </SignedIn>
      </Toolbar>
    </AppBar>
  )
}

export default Header
