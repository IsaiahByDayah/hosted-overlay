import { AppBar, Toolbar, Box, Typography, Button } from "@material-ui/core"

import { useAuthContext } from "components/scaffold/AuthProvider"

import SignedIn from "components/common/SignedIn"
import OpenOverlayButton from "components/common/OpenOverlayButton"

const Header = () => {
  const { signOut } = useAuthContext()

  return (
    <AppBar position="relative">
      <Toolbar>
        <Box flexGrow={1}>
          <Typography>Hosted Overlay</Typography>
        </Box>
        <SignedIn>
          <Button variant="outlined" onClick={() => signOut()}>
            Sign Out
          </Button>
          <Box marginLeft={2}>
            <OpenOverlayButton />
          </Box>
        </SignedIn>
      </Toolbar>
    </AppBar>
  )
}

export default Header
