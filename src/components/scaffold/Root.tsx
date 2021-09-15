import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { Box, BoxProps } from "@material-ui/core"

import CssBaselined from "components/scaffold/CssBaselined"
import ThemeProvider from "components/scaffold/ThemeProvider"
import AuthProvider from "components/scaffold/AuthProvider"

const Root: FC<BoxProps> = (props) => (
  <ThemeProvider>
    <CssBaselined>
      <BrowserRouter>
        <AuthProvider>
          <Box id="scaffold-root" {...props} />
        </AuthProvider>
      </BrowserRouter>
    </CssBaselined>
  </ThemeProvider>
)

export default Root
