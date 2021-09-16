import { ReactNode, useContext } from "react"
import { Hidden, HiddenProps } from "@mui/material"

import { AuthContext } from "components/scaffold/AuthProvider"

export interface SignedOutProps {
  children: ReactNode
  implementation?: HiddenProps["implementation"]
}

const SignedOut = ({ children, ...rest }: SignedOutProps) => {
  const { user } = useContext(AuthContext)

  return (
    <Hidden {...rest} xsUp={Boolean(user)}>
      {children}
    </Hidden>
  )
}

export default SignedOut
