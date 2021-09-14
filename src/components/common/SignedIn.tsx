import { ReactNode, useContext } from "react"
import { Hidden, HiddenProps } from "@material-ui/core"

import { AuthContext } from "components/scaffold/AuthProvider"

export interface SignedInProps {
  children: ReactNode
  implementation?: HiddenProps["implementation"]
}

const SignedIn = ({ children, ...rest }: SignedInProps) => {
  const { user } = useContext(AuthContext)

  return (
    <Hidden {...rest} xsUp={!Boolean(user)}>
      {children}
    </Hidden>
  )
}

export default SignedIn
