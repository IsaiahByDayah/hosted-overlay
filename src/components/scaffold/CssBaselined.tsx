import { ReactNode } from "react"
import { CssBaseline } from "@mui/material"

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
