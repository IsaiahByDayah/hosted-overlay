import { FC } from "react"
import { CssBaseline } from "@material-ui/core"

const CssBaselined: FC = ({ children }) => (
  <>
    <CssBaseline />
    {children}
  </>
)

export default CssBaselined
