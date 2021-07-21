import { ReactNode } from "react"
import { CssBaseline } from "@material-ui/core"

interface CssBaseinedProps {
  children?: ReactNode
}
const CssBaselined = ({ children }: CssBaseinedProps) => (
  <>
    <CssBaseline />
    {children}
  </>
)

export default CssBaselined
