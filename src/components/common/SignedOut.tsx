import { useContext, FC } from "react"
import { Hidden, HiddenProps } from "@material-ui/core"

import { AuthContext } from "components/scaffold/AuthProvider"

export interface SignedOutProps {
  implementation?: HiddenProps["implementation"]
}

const SignedOut: FC<SignedOutProps> = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext)

  return (
    <Hidden {...rest} xsUp={Boolean(user)}>
      {children}
    </Hidden>
  )
}

export default SignedOut
