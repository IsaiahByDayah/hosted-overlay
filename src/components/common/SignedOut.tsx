import { ReactNode, useContext } from "react"
import { Box } from "@mui/material"

import { AuthContext } from "components/scaffold/AuthProvider"

export interface SignedOutProps {
  children: ReactNode
  nullOnHide?: boolean
}

const SignedOut = ({ children, nullOnHide = true }: SignedOutProps) => {
  const { user } = useContext(AuthContext)

  if (nullOnHide && Boolean(user)) return null

  return (
    <Box
      sx={{
        display: !Boolean(user) ? undefined : "none",
      }}
    >
      {children}
    </Box>
  )
}

export default SignedOut
