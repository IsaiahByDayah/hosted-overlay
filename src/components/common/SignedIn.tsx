import { useContext, FC } from "react"
import { Hidden, HiddenProps } from "@material-ui/core"

import { AuthContext } from "components/scaffold/AuthProvider"

export interface SignedInProps {
  implementation?: HiddenProps["implementation"]
}

const SignedIn: FC<SignedInProps> = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext)

  return (
    <Hidden {...rest} xsUp={!Boolean(user)}>
      {children}
    </Hidden>
  )
}

export default SignedIn
